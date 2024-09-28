import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import AssetPage from './pages/Asset';
import ExchangePage from './pages/Exchange';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => (
  <Router>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" />
        {/* Adicione Menu e Links Aqui */}
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <h1>PTT Radio Management System</h1>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Routes>
            <Route path="/assets" element={<AssetPage />} />
            <Route path="/exchanges" element={<ExchangePage />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>PTT Radio Management System ©2024</Footer>
      </Layout>
    </Layout>
  </Router>
);

export default App;
