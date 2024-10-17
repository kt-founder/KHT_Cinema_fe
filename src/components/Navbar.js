// src/components/Navbar.js
import React from 'react';
import { Menu } from 'antd';
import "../pages/styles/global.css"
import logo from "../assets/images/logo2.png"
const Navbar = () => {
    return (
        <Menu mode="horizontal" className="navbar" style={{ justifyContent: 'start' }}>
            <Menu.Item key="logo" style={{ padding: '0 20px' }}>
                <a href="/">
                    <img
                        src={logo}  // Đường dẫn đến logo
                        alt="Logo"
                        style={{ height: '75px', marginRight: '70px' }} // Điều chỉnh kích thước logo
                    />
                </a>
            </Menu.Item>
            <Menu.Item key="home">Trang chủ</Menu.Item>
            <Menu.Item key="schedule">Lịch chiếu</Menu.Item>
            <Menu.Item key="promo">Khuyến mãi</Menu.Item>
            <Menu.Item key="price">Giá vé</Menu.Item>
            <Menu.Item key="festival">Liên hoan phim</Menu.Item>
            <Menu.Item key="about">Giới thiệu</Menu.Item>
            <Menu.Item key="SignUp"> <a href="/signup">Đăng kí</a></Menu.Item>
            <Menu.Item key="Login"> <a href="/login">Đăng nhập</a></Menu.Item>
        </Menu>
    );
};

export default Navbar;
