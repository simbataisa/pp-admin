import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Products from "./pages/Products";
import Packages from "./pages/Packages";
import Modules from "./pages/Modules";
import TenantPlans from "./pages/TenantPlans";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout>
          <Content
            style={{ margin: "24px 16px", padding: 24, background: "#fff" }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/products" element={<Products />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/modules" element={<Modules />} />
              <Route path="/tenant-plans" element={<TenantPlans />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
