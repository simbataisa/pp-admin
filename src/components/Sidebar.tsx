// File: src/components/Sidebar.tsx
import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  ProjectOutlined,
  AppstoreOutlined,
  BoxPlotOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useStore } from "../store/useStore";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const selectedMenu = useStore((state) => state.selectedMenu);
  const setSelectedMenu = useStore((state) => state.setSelectedMenu);

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/",
    },
    {
      key: "plans",
      icon: <ProjectOutlined />,
      label: "Plans",
      path: "/plans",
    },
    {
      key: "products",
      icon: <AppstoreOutlined />,
      label: "Products",
      path: "/products",
    },
    {
      key: "packages",
      icon: <BoxPlotOutlined />,
      label: "Packages",
      path: "/packages",
    },
    {
      key: "modules",
      icon: <AppstoreAddOutlined />,
      label: "Modules",
      path: "/modules",
    },
    {
      key: "tenant-plans",
      icon: <TeamOutlined />,
      label: "Tenant Plans",
      path: "/tenant-plans",
    },
  ];

  const handleMenuClick = (key: string) => {
    setSelectedMenu(key);
    const item = menuItems.find((item) => item.key === key);
    if (item) {
      navigate(item.path);
    }
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        background: "#fff",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          height: "64px",
          margin: "16px",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        AHSS-PP Admin
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedMenu]}
        items={menuItems}
        onClick={({ key }) => handleMenuClick(key)}
        style={{
          border: "none",
        }}
      />
    </Sider>
  );
};

export default Sidebar;
