// src/pages/Home.js
import React from 'react';
import { Layout } from 'antd';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MovieList from '../components/MovieList';
import Promotion from '../components/Promotion';
import Events from '../components/Events';
import './styles/global.css';  // Import file CSS

const { Header, Content, Sider } = Layout;

const Home = () => {
  return (
    <Layout className="full-width" style={{ backgroundColor: '#111' }}>
      <Header className="full-width" style={{ backgroundColor: '#000' }}>
        <Navbar />
      </Header>
      <Layout className="full-width">
        <Sider width={250} style={{ backgroundColor: '#1f1f1f' }}>
          <Sidebar />
        </Sider>
        <Content className="full-container" style={{ margin: '0', backgroundColor: '#000' }}>
          <div className="full-row">
            <MovieList />
            <Promotion />
            <Events />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
