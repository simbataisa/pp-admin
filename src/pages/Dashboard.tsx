import React from "react";
import { Card, Row, Col, Statistic, Table, Typography } from "antd";
import {
  ShoppingOutlined,
  AppstoreOutlined,
  BoxPlotOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons"; // Removed TeamOutlined
import { planStore } from "@/store/planStore";
import { productStore } from "@/store/productStore";
import { packageStore } from "@/store/packageStore";
import { moduleStore } from "@/store/moduleStore";
import { recentActivityDataStore } from "@/store/recentActivityDataStore";

const { Title } = Typography;

const Dashboard: React.FC = () => {
  // Mock data - replace with actual API calls
  const plans = planStore((state) => state.plans);

  const products = productStore((state) => state.products);

  const packages = packageStore((state) => state.packages);

  const modules = moduleStore((state) => state.modules);

  const recentActivityColumns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
    },
  ];

  const recentActivityData = recentActivityDataStore(
    (state) => state.recentActivityData
  );

  return (
    <div>
      <Title level={2}>Dashboard</Title>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Plans"
              value={plans.length}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={products.length}
              prefix={<AppstoreOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Packages"
              value={packages.length}
              prefix={<BoxPlotOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Modules"
              value={modules.length}
              prefix={<AppstoreAddOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Status Distribution Cards */}
      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col xs={24} sm={12}>
          <Card title="Plan Status Distribution">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Statistic
                  title="Active"
                  value={plans.filter((p) => p.plan_status === "ACTIVE").length}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Inactive"
                  value={
                    plans.filter((p) => p.plan_status === "INACTIVE").length
                  }
                  valueStyle={{ color: "#cf1322" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Deprecated"
                  value={
                    plans.filter((p) => p.plan_status === "DEPRECATED").length
                  }
                  valueStyle={{ color: "#8c8c8c" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card title="Product Status Distribution">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Statistic
                  title="Active"
                  value={
                    products.filter((p) => p.product_status === "ACTIVE").length
                  }
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Inactive"
                  value={
                    products.filter((p) => p.product_status === "INACTIVE")
                      .length
                  }
                  valueStyle={{ color: "#cf1322" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Deprecated"
                  value={
                    products.filter((p) => p.product_status === "DEPRECATED")
                      .length
                  }
                  valueStyle={{ color: "#8c8c8c" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity Table */}
      <Card title="Recent Activity" style={{ marginTop: "24px" }}>
        <Table
          columns={recentActivityColumns}
          dataSource={recentActivityData}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
