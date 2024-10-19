// src/components/Navbar.js
import React, { useState } from 'react';
import { Menu } from 'antd';
import logo from "../assets/images/logo2.png";
import './StylesComponent/Navbar.css';  // Import CSS

const Navbar = () => {
    const [username, setUserName] = useState(sessionStorage.getItem("userName"));

    const handleLogout = async (e) => {
        e.preventDefault();
        console.log("logout click");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("HTK_ACCESS_TOKEN_USER");
        sessionStorage.removeItem("HTK_REFRESH_TOKEN_USER");
        window.location.href = '/';
    };

    return (
        <Menu mode="horizontal" className="navbar">
            <Menu.Item key="logo" style={{  padding: '20 50px' }}>
                <a href="/">
                    <img
                        src={logo}  // Đường dẫn đến logo
                        alt="Logo"
                        className="logo"  // Thêm class logo cho hình ảnh
                    />
                </a>
            </Menu.Item>
            <Menu.Item key="1" style={{ color: '#fff' }}>Trang chủ</Menu.Item>
            <Menu.Item key="2" style={{ color: '#fff' }}>Lịch chiếu</Menu.Item>
            <Menu.Item key="promo" style={{ color: '#fff' }}>Khuyến mãi</Menu.Item>
            <Menu.Item key="price" style={{ color: '#fff' }}>Giá vé</Menu.Item>
            <Menu.Item key="festival" style={{ color: '#fff' }}>Liên hoan phim</Menu.Item>
            <Menu.Item key="about" style={{ color: '#fff' }}>Giới thiệu</Menu.Item>
            <Menu.Item key="auth" style={{ color: '#fff' }}>
                {username == null ? (
                    <div>
                        <Menu.Item key="Login" href="/login" style={{ color: '#fff' }}>
                            <a href="/Login">Đăng nhập</a>
                        </Menu.Item>
                    </div>
                ) : (
                    <div>
                        <Menu.Item key="SignUp" style={{ color: '#fff' }}>
                            <a href="/myInfor">Username: {username}</a>
                        </Menu.Item>
                        <Menu.Item key="Logout" href="/login" style={{ color: '#fff' }}>
                            <a onClick={handleLogout}>Đăng xuất</a>
                        </Menu.Item>
                    </div>
                )}
            </Menu.Item>
        </Menu>
    );
};

export default Navbar;
