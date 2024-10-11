import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <img src="/src/assets/images/logo.png" alt="KHT logo" className="logo" />
      <nav>
        <Link to="/">Trang chủ</Link>
        <Link to="/booking">Đặt vé</Link>
        <Link to="/login">Đăng nhập</Link>
      </nav>
    </header>
  );
}

export default Header;
