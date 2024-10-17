// src/components/MainLayout.js
import React from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';

const { Header, Content, Sider } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <h1 style={{ textAlign: 'center' }}>Quản lý hệ thống xem phim</h1>
        </Header>
        <Content style={{ margin: '16px' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
