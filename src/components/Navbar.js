// src/components/Navbar.js
import React from 'react';
import { Menu } from 'antd';

const Navbar = () => {
  return (
    <Menu mode="horizontal" style={{ backgroundColor: '#0000FF', color: '#0000FF', justifyContent: 'center', padding: '10px 5' }}>
      <Menu.Item key="home" style={{ color: '#fff' }}>Trang chủ</Menu.Item>
      <Menu.Item key="schedule" style={{ color: '#fff' }}>Lịch chiếu</Menu.Item>
      <Menu.Item key="promo" style={{ color: '#fff' }}>Khuyến mãi</Menu.Item>
      <Menu.Item key="price" style={{ color: '#fff' }}>Giá vé</Menu.Item>
      <Menu.Item key="festival" style={{ color: '#fff' }}>Liên hoan phim</Menu.Item>
      <Menu.Item key="about" style={{ color: '#fff' }}>Giới thiệu</Menu.Item>
      <Menu.Item key="SignUp" style={{ color: '#fff' }}> <a href="/signup">Đăng kí</a></Menu.Item>
      <Menu.Item key="Login" href="/login" style={{ color: '#fff' }}> <a href="/login">Đăng nhập</a></Menu.Item>
    </Menu>
  );
};

export default Navbar;
