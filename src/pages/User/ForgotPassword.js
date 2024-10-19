import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import {useNavigate} from "react-router-dom";
import Api from "../../Confligs/Api";

function ForgotPassword() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleLogic = (event) => {
        event.preventDefault();
        const data = {
            username: username,
            email: email
        }
        Api.ForgotPassword(data).then((res) => {
            const receive = res.data.data;
            console.log(receive)
            if (receive != null){
                console.log('hello')
                navigate('/verify', {state: receive})
            }
            else {
                setError("Username or email not correct")
            }
        }).catch((err) => {
            console.log(err)
            setError("Username or email not correct")
        })
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

export default ForgotPassword;
