
// src/pages/Home.js
import React from 'react';
import { Layout } from 'antd';

import '../styles/global.css';
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import MovieList from "../../components/MovieList";
import Promotion from "../../components/Promotion";
import Events from "../../components/Events";  // Import file CSS

const { Header, Content, Sider } = Layout;

const Home = () => {
    return (
        <Layout className="full-width" style={{ backgroundColor: '#111' }}>
            <Header className="full-width" style={{ backgroundColor: '#0000ff' }}>
                <Navbar/>
            </Header>
            <Layout className="full-width">
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