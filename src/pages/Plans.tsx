import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Plan, PlanFormData } from "../types";
import { planStore } from "@/store/planStore";

const { RangePicker } = DatePicker;

const Plans: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [form] = Form.useForm();
  const plans = planStore((state) => state.plans);
  const setPlans = planStore((state) => state.setPlans);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Discount Rate",
      dataIndex: "discount_rate",
      key: "discount_rate",
      render: (rate: number) => `${rate}%`,
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Plan Type",
      dataIndex: "plan_type",
      key: "plan_type",
    },
    {
      title: "Status",
      dataIndex: "plan_status",
      key: "plan_status",
      render: (status: string) => (
        <Select
          value={status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(status, value)}
        >
          <Select.Option value="ACTIVE">Active</Select.Option>
          <Select.Option value="INACTIVE">Inactive</Select.Option>
          <Select.Option value="DEPRECATED">Deprecated</Select.Option>
        </Select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Plan) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.plan_id)}
          />
        </Space>
      ),
    },
  ];

  const handleStatusChange = (oldStatus: string, newStatus: string) => {
    // Implement status change logic
    message.success(`Status changed from ${oldStatus} to ${newStatus}`);
  };

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    form.setFieldsValue({
      name: plan.name,
      discount_rate: plan.discount_rate,
      plan_type: plan.plan_type,
      plan_status: plan.plan_status,
      // Set date range accordingly
    });
    setIsModalVisible(true);
  };

  const handleDelete = (planId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this plan?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        // Implement delete logic
        setPlans(plans.filter((plan) => plan.plan_id !== planId));
        message.success("Plan deleted successfully");
      },
    });
  };

  const handleSubmit = async (values: PlanFormData) => {
    try {
      const newPlan = {
        plan_id: editingPlan?.plan_id || Math.random(), // Replace with actual ID generation
        name: values.name,
        discount_rate: values.discount_rate,
        start_date: values.date_range[0].format("YYYY-MM-DD"),
        end_date: values.date_range[1].format("YYYY-MM-DD"),
        plan_type: values.plan_type,
        plan_status: values.plan_status,
      };

      if (editingPlan) {
        // Update existing plan
        setPlans(
          plans.map((plan) =>
            plan.plan_id === editingPlan.plan_id ? newPlan : plan
          )
        );
        message.success("Plan updated successfully");
      } else {
        // Create new plan
        setPlans([...plans, newPlan]);
        message.success("Plan created successfully");
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditingPlan(null);
    } catch (error) {
      message.error("Error saving plan");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingPlan(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Add New Plan
        </Button>
      </div>

      <Table columns={columns} dataSource={plans} rowKey="plan_id" />

      <Modal
        title={editingPlan ? "Edit Plan" : "Create New Plan"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingPlan(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Plan Name"
            rules={[{ required: true, message: "Please enter plan name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="discount_rate"
            label="Discount Rate (%)"
            rules={[{ required: true, message: "Please enter discount rate" }]}
          >
            <Input type="number" min={0} max={100} />
          </Form.Item>

          <Form.Item
            name="date_range"
            label="Valid Period"
            rules={[{ required: true, message: "Please select date range" }]}
          >
            <RangePicker />
          </Form.Item>

          <Form.Item
            name="plan_type"
            label="Plan Type"
            rules={[{ required: true, message: "Please select plan type" }]}
          >
            <Select>
              <Select.Option value="SUBSCRIPTION">Subscription</Select.Option>
              <Select.Option value="ONE_TIME">One Time</Select.Option>
              <Select.Option value="TRIAL">Trial</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="plan_status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select>
              <Select.Option value="ACTIVE">Active</Select.Option>
              <Select.Option value="INACTIVE">Inactive</Select.Option>
              <Select.Option value="DEPRECATED">Deprecated</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingPlan ? "Update" : "Create"}
              </Button>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                  setEditingPlan(null);
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Plans;
