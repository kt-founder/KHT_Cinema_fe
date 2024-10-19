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
    const handleLogic = () => {
        const data = {
            id: receivedData.id,
            password: password
        }
        const handleLogic = () => {
            if (password === checkPassword){
                Api.UpdatePassword(data).then((res) => {
                    const receive = res.data.data;
                    if (receive != null){
                        notification["success"]({
                            message: "Update password successful",
                        });
                        window.location.href = 'login'
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
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>VUI LÒNG NHẬP THÔNG TIN ĐỂ TIẾN HÀNH XÁC THỰC</h2>
                <form onSubmit={handleLogic}>
                    <div className="input-group">
                        <label>Tên đăng nhập *</label>
                        <input
                            type="text"
                            placeholder="Nhập tên đăng nhập của bạn"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Email đăng ký *</label>
                        <input
                            type="password"
                            placeholder="Nhập email đăng ký của ban"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
