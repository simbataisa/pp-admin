// File: src/pages/Modules.tsx
import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Module, ModuleFormData } from "../types";
import { moduleStore } from "@/store/moduleStore";
import { productStore } from "@/store/productStore";

const Modules: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [form] = Form.useForm();

  const modules = moduleStore((state) => state.modules);
  const setModules = moduleStore((state) => state.setModules);

  const products = productStore((state) => state.products);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Product",
      dataIndex: "product_id",
      key: "product_id",
      render: (productId: number) => {
        const product = products.find((p) => p.product_id === productId);
        return product ? product.product_name : "N/A";
      },
    },
    {
      title: "Status",
      dataIndex: "module_status",
      key: "module_status",
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
      render: (_: any, record: Module) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.module_id)}
          />
        </Space>
      ),
    },
  ];

  const handleStatusChange = (oldStatus: string, newStatus: string) => {
    message.success(`Status changed from ${oldStatus} to ${newStatus}`);
  };

  const handleEdit = (module: Module) => {
    setEditingModule(module);
    form.setFieldsValue({
      name: module.name,
      price: module.price,
      product_id: module.product_id,
      module_status: module.module_status,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (moduleId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this module?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setModules(modules.filter((module) => module.module_id !== moduleId));
        message.success("Module deleted successfully");
      },
    });
  };

  const handleSubmit = async (values: ModuleFormData) => {
    try {
      const newModule = {
        module_id: editingModule?.module_id || Math.random(),
        ...values,
      };

      if (editingModule) {
        setModules(
          modules.map((module) =>
            module.module_id === editingModule.module_id ? newModule : module
          )
        );
        message.success("Module updated successfully");
      } else {
        setModules([...modules, newModule]);
        message.success("Module created successfully");
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditingModule(null);
    } catch (error) {
      message.error("Error saving module");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingModule(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Add New Module
        </Button>
      </div>

      <Table columns={columns} dataSource={modules} rowKey="module_id" />

      <Modal
        title={editingModule ? "Edit Module" : "Create New Module"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingModule(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Module Name"
            rules={[{ required: true, message: "Please enter module name" }]}
          >
            <Input />
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
            name="product_id"
            label="Product"
            rules={[{ required: true, message: "Please select product" }]}
          >
            <Select>
              {products.map((product) => (
                <Select.Option
                  key={product.product_id}
                  value={product.product_id}
                >
                  {product.product_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="module_status"
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
                {editingModule ? "Update" : "Create"}
              </Button>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                  setEditingModule(null);
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

export default Modules;
