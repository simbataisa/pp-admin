// File: src/pages/TenantPlans.tsx
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
import type { TenantPlan, Plan } from "../types";
import dayjs from "dayjs";
import { planStore } from "@/store/planStore";
import { tenantPlansStore } from "@/store/tenantPlansStore";

interface TenantPlanFormData {
  tenant_code: string;
  plan_id: number;
  assigned_at: dayjs.Dayjs;
}

const TenantPlans: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTenantPlan, setEditingTenantPlan] = useState<TenantPlan | null>(
    null
  );
  const [form] = Form.useForm();

  const tenantPlans = tenantPlansStore((state) => state.tenantPlans);
  const setTenantPlans = tenantPlansStore((state) => state.setTenantPlans);

  const plans = planStore((state) => state.plans);

  const columns = [
    {
      title: "Tenant Code",
      dataIndex: "tenant_code",
      key: "tenant_code",
    },
    {
      title: "Plan",
      dataIndex: "plan_id",
      key: "plan_id",
      render: (planId: number) => {
        const plan = plans.find((p) => p.plan_id === planId);
        return plan ? plan.name : "N/A";
      },
    },
    {
      title: "Assigned Date",
      dataIndex: "assigned_at",
      key: "assigned_at",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: TenantPlan) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.tenant_id)}
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (tenantPlan: TenantPlan) => {
    setEditingTenantPlan(tenantPlan);
    form.setFieldsValue({
      tenant_code: tenantPlan.tenant_code,
      plan_id: tenantPlan.plan_id,
      assigned_at: dayjs(tenantPlan.assigned_at),
    });
    setIsModalVisible(true);
  };

  const handleDelete = (tenantId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this tenant plan?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setTenantPlans(tenantPlans.filter((tp) => tp.tenant_id !== tenantId));
        message.success("Tenant plan deleted successfully");
      },
    });
  };

  const handleSubmit = async (values: TenantPlanFormData) => {
    try {
      const newTenantPlan = {
        tenant_id: editingTenantPlan?.tenant_id || Math.random(),
        tenant_code: values.tenant_code,
        plan_id: values.plan_id,
        assigned_at: values.assigned_at.format("YYYY-MM-DD"),
      };

      if (editingTenantPlan) {
        setTenantPlans(
          tenantPlans.map((tp) =>
            tp.tenant_id === editingTenantPlan.tenant_id ? newTenantPlan : tp
          )
        );
        message.success("Tenant plan updated successfully");
      } else {
        setTenantPlans([...tenantPlans, newTenantPlan]);
        message.success("Tenant plan created successfully");
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditingTenantPlan(null);
    } catch (error) {
      message.error("Error saving tenant plan");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingTenantPlan(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Add New Tenant Plan
        </Button>
      </div>

      <Table columns={columns} dataSource={tenantPlans} rowKey="tenant_id" />

      <Modal
        title={
          editingTenantPlan ? "Edit Tenant Plan" : "Create New Tenant Plan"
        }
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingTenantPlan(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="tenant_code"
            label="Tenant Code"
            rules={[{ required: true, message: "Please enter tenant code" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="plan_id"
            label="Plan"
            rules={[{ required: true, message: "Please select plan" }]}
          >
            <Select>
              {plans.map((plan) => (
                <Select.Option key={plan.plan_id} value={plan.plan_id}>
                  {plan.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="assigned_at"
            label="Assigned Date"
            rules={[{ required: true, message: "Please select assigned date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingTenantPlan ? "Update" : "Create"}
              </Button>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                  setEditingTenantPlan(null);
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

export default TenantPlans;
