import React from 'react';
import './StylesComponent/Header.css'; // Chứa các CSS cho header

const Header = () => {
    const logout = () => {
        sessionStorage.removeItem("ADMIN_USERNAME")
        sessionStorage.removeItem("HKT_ACCESS_TOKEN_ADMIN")
        window.location.href='';
    }
    return (
        <header className="main-header">
            <div className="header-left">
                <h1>Dashboard</h1>
            </div>
            <div className="header-right">
                <div className="user-menu">
                    <img
                        src="https://via.placeholder.com/40"
                        alt="User Avatar"
                        className="user-avatar"
                        style={{visibility:'hidden'}}
                    />
                    <span className="username" onClick={logout} style={{cursor:'pointer'}}>Đăng xuât <i style={{marginLeft:'10px'}} className="fa-solid fa-right-from-bracket"></i></span>
                </div>
            </div>
        </header>
    );
};

export default Header;