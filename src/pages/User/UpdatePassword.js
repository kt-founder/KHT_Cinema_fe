import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import {useLocation, useNavigate} from "react-router-dom";
import Api from "../../Confligs/Api";
import {notification} from "antd";

function UpdatePassword() {
    const [password, setPass] = useState('');
    const [checkPassword, setCPass] = useState('');
    const [error, setError] = useState(null);
    const location = useLocation();
    const receivedData = location.state;
    const handleLogic = (event) => {
        event.preventDefault();
        const data = {
            id: receivedData,
            password: password
        }
        console.log(data)
        if (password === checkPassword){
            Api.UpdatePassword(data).then((res) => {
                const receive = res.data;
                if (receive != null){
                    notification["success"]({
                        message: "Update password successful",
                    });
                    window.location.href = '/login'
                }
            }).catch((err) => {
                console.log(err)
                notification["error"]({
                    message: "Update password not successful",
                });

                setError("err")
            })
        } else{
            setPass('')
            setCPass('')
            setError("Please enter again")
        }
}

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>CẬP NHẬT MẬT KHẨU MỚI</h2>
                <form onSubmit={handleLogic}>
                    <div className="input-group">
                        <label>Mật khẩu  *</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu mới của bạn"
                            value={password}
                            onChange={(e) => setPass(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Nhập lại mật khẩu *</label>
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu của ban"
                            value={checkPassword}
                            onChange={(e) => setCPass(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error" >{error}</p>}
                    <button type="submit">Xác thực</button>
                </form>
            </div>
        </div>
    );
}

export default UpdatePassword;
