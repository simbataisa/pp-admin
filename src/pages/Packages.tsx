// File: src/pages/Packages.tsx
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
  InputNumber,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Package, PackageFormData } from "../types";
import dayjs, { Dayjs } from "dayjs";
import { packageStore } from "@/store/packageStore";

const { RangePicker } = DatePicker;

// First, let's update the PackageFormData interface
interface FormValues extends Omit<PackageFormData, "date_range"> {
  date_range: [Dayjs, Dayjs] | null;
}

const Packages: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [form] = Form.useForm();

  const packages = packageStore((state) => state.packages);
  const setPackages = packageStore((state) => state.setPackages);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "package_status",
      key: "package_status",
      render: (status: string, record: Package) => (
        <Select
          value={status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record.package_id, value)}
        >
          <Select.Option value="ACTIVE">Active</Select.Option>
          <Select.Option value="INACTIVE">Inactive</Select.Option>
          <Select.Option value="DEPRECATED">Deprecated</Select.Option>
        </Select>
      ),
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Valid Period",
      key: "period",
      render: (_: any, record: Package) =>
        `${record.start_date} to ${record.end_date}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Package) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.package_id)}
          />
        </Space>
      ),
    },
  ];

  const handleStatusChange = (packageId: number, newStatus: string) => {
    setPackages(
      packages.map((pkg) =>
        pkg.package_id === packageId
          ? { ...pkg, package_status: newStatus }
          : pkg
      )
    );
    message.success("Status updated successfully");
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    form.setFieldsValue({
      name: pkg.name,
      type: pkg.type,
      price: pkg.price,
      package_status: pkg.package_status,
      version: pkg.version,
      date_range: [dayjs(pkg.start_date), dayjs(pkg.end_date)],
    });
    setIsModalVisible(true);
  };

  const handleDelete = (packageId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this package?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setPackages(packages.filter((pkg) => pkg.package_id !== packageId));
        message.success("Package deleted successfully");
      },
    });
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      if (!values.date_range) {
        message.error("Please select a valid date range");
        return;
      }

      const [startDate, endDate] = values.date_range;

      const newPackage = {
        package_id: editingPackage?.package_id || Math.random(),
        name: values.name,
        type: values.type,
        price: values.price,
        package_status: values.package_status,
        start_date: startDate.format("YYYY-MM-DD"),
        end_date: endDate.format("YYYY-MM-DD"),
        version: values.version,
      };

      if (editingPackage) {
        setPackages(
          packages.map((pkg) =>
            pkg.package_id === editingPackage.package_id ? newPackage : pkg
          )
        );
        message.success("Package updated successfully");
      } else {
        setPackages([...packages, newPackage]);
        message.success("Package created successfully");
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditingPackage(null);
    } catch (error) {
      message.error("Error saving package");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingPackage(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Add New Package
        </Button>
      </div>

      <Table columns={columns} dataSource={packages} rowKey="package_id" />

      <Modal
        title={editingPackage ? "Edit Package" : "Create New Package"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingPackage(null);
        }}
        footer={null}
      >
        <Form<FormValues> form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Package Name"
            rules={[{ required: true, message: "Please enter package name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please select type" }]}
          >
            <Select>
              <Select.Option value="SUBSCRIPTION">Subscription</Select.Option>
              <Select.Option value="ONE_TIME">One Time</Select.Option>
              <Select.Option value="TRIAL">Trial</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <InputNumber
              prefix="$"
              min={0}
              step={0.01}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="date_range"
            label="Valid Period"
            rules={[{ required: true, message: "Please select date range" }]}
          >
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="version"
            label="Version"
            rules={[{ required: true, message: "Please enter version" }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="package_status"
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
                {editingPackage ? "Update" : "Create"}
              </Button>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                  setEditingPackage(null);
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

export default Packages;
