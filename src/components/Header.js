import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo.png"
function Header() {
    const [username, setUserName] = useState(sessionStorage.getItem("userName"))
    const handleLogout = async(e) => {
        e.preventDefault();
        console.log("logout click")
        sessionStorage.removeItem("userName")
        sessionStorage.removeItem("ac_token")
        sessionStorage.removeItem("rf_token")
        window.location.href = '/'
    }
    return (
    <header>
        <div style={{marginLeft:"20px"}}>
            <img src={logo} alt="KHT logo" className="logo"/>
        </div>
        <nav>
            <Link to="/" style={{marginBottom:'20px'}}>Trang chủ</Link>
            {username != null ? <span style={{color: 'red'}}>Username: {username}</span> : null}
            {username != null ? <a onClick={handleLogout}><span>Đăng xuất</span></a> : <Link to="/login" >Đăng nhập</Link>}
      </nav>
    </header>
    );
}
export default Header;
