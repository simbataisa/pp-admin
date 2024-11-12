// File: src/pages/Products.tsx
import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Product, ProductFormData } from "../types";

const Products: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  const [products, setProducts] = useState<Product[]>([
    {
      product_id: 1,
      product_code: "AHIS",
      product_name: "Precision Insights Studio",
      description:
        "Precision Insights Studio is a powerful analytics tool that helps you make data-driven decisions.",
      product_status: "ACTIVE",
    },
  ]);

  const columns = [
    {
      title: "Product Code",
      dataIndex: "product_code",
      key: "product_code",
    },
    {
      title: "Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "product_status",
      key: "product_status",
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
      render: (_: any, record: Product) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.product_id)}
          />
        </Space>
      ),
    },
  ];

  const handleStatusChange = (oldStatus: string, newStatus: string) => {
    message.success(`Status changed from ${oldStatus} to ${newStatus}`);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue({
      product_code: product.product_code,
      product_name: product.product_name,
      description: product.description,
      product_status: product.product_status,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (productId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        setProducts(
          products.filter((product) => product.product_id !== productId)
        );
        message.success("Product deleted successfully");
      },
    });
  };

  const handleSubmit = async (values: ProductFormData) => {
    try {
      const newProduct = {
        product_id: editingProduct?.product_id || Math.random(),
        ...values,
      };

      if (editingProduct) {
        setProducts(
          products.map((product) =>
            product.product_id === editingProduct.product_id
              ? newProduct
              : product
          )
        );
        message.success("Product updated successfully");
      } else {
        setProducts([...products, newProduct]);
        message.success("Product created successfully");
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditingProduct(null);
    } catch (error) {
      message.error("Error saving product");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingProduct(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Add New Product
        </Button>
      </div>

      <Table columns={columns} dataSource={products} rowKey="product_id" />

      <Modal
        title={editingProduct ? "Edit Product" : "Create New Product"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingProduct(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="product_code"
            label="Product Code"
            rules={[{ required: true, message: "Please enter product code" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="product_name"
            label="Product Name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="product_status"
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
                {editingProduct ? "Update" : "Create"}
              </Button>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                  setEditingProduct(null);
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

export default Products;
