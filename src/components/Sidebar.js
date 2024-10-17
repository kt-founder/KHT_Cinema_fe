// src/components/Sidebar.js
import React from 'react';
import { Menu } from 'antd';
import {
  VideoCameraOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  DashboardOutlined,
  FileOutlined,
} from '@ant-design/icons';

const Sidebar = () => {
  return (
    <Menu
      theme="dark" // Cập nhật giao diện sidebar sang dark mode
      mode="inline"
      defaultOpenKeys={['sub1', 'sub2']}
      defaultSelectedKeys={['1']}
      style={{ height: '100vh', backgroundColor: '#1f1f1f' }} // Đặt chiều cao và màu nền
    >
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        Dashboard
      </Menu.Item>
      
      <Menu.SubMenu key="sub1" icon={<VideoCameraOutlined />} title="Quản lý phim">
        <Menu.Item key="movies">Danh sách phim</Menu.Item>
        <Menu.Item key="add-movie">Thêm phim mới</Menu.Item>
        <Menu.Item key="movie-categories">Thể loại phim</Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key="sub2" icon={<UserOutlined />} title="Quản lý người dùng">
        <Menu.Item key="user-list">Danh sách người dùng</Menu.Item>
        <Menu.Item key="user-add">Thêm người dùng</Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key="revenue" icon={<DollarOutlined />}>
        Quản lý doanh thu
      </Menu.Item>

      <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
        Quản lý giỏ hàng
      </Menu.Item>

      <Menu.SubMenu key="sub3" icon={<FileOutlined />} title="Quản lý khác">
        <Menu.Item key="promotions">Khuyến mãi</Menu.Item>
        <Menu.Item key="events">Sự kiện</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default Sidebar;
