import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import {useNavigate} from "react-router-dom";

function ForgotPassword() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Gọi API đăng nhập
            const response = await axios.post('', {
                username,
                email,
            });

            const token = response.data.data;
            if (token != null && token.error == null){
                // navigate('/verify', {state: token})
                navigate('/verify', {state: "hieudzaivl"})
            } else{
                setError("Tên đăng nhập hoặc mật khẩu không đúng!")
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>VUI LÒNG NHẬP THÔNG TIN ĐỂ TIẾN HÀNH XÁC THỰC</h2>
                <form onSubmit={handleLogin}>
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
