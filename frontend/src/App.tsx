import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import AssetPage from './pages/Asset';
import ExchangePage from './pages/Exchange';
import SideMenu from './components/SideMenu';

const { Header, Footer } = Layout;

const App: React.FC = () => (
  <Router>
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {/* <h1>PTT Radio Management System</h1> */}
          PTT Radio Management System
        </Header>
        <SideMenu>
        </SideMenu>
        <Footer style={{ textAlign: 'center' }}>PTT Radio Management System ©2024</Footer>
      </Layout>
    </Layout>
  </Router>
);

export default App;
