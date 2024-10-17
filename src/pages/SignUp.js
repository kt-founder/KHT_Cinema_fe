import React, { useState } from 'react';
import axios from 'axios';
import './styles/SignUp.css';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [checkPass, setCheckPass] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (checkPass !== password){
            setError("Password must match !")
            return null;
        }
        try {
            setError('')
            console.log("call api")
            // Gọi API đăng nhập
            const response = await axios.post('http://localhost:8080/auth/sign-up', {
                username,
                password,
                email,
            });

            const token = response.data;
            if (token != null && token.error == null){
                console.log("data receive: " , token)
                console.log("access_token: " ,token.data.access_token)
                console.log("refresh_token: " ,token.data.refresh_token)
                alert('Đăng ký thành công!');
                sessionStorage.setItem("userName", username)
                window.location.href = '/movie';
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
                    <h2>CHÀO MỪNG ĐẾN VỚI</h2>
                <h1>KHTCinema</h1>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email*</label>
                        <input
                            type="email"
                            placeholder="Nhập tên đăng nhập của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Tên đăng nhập*</label>
                        <input
                            type="text"
                            placeholder="Nhập tên đăng nhập của bạn"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Mật khẩu*</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu của bạn"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Nhập lại mật khẩu*</label>
                        <input
                            type="password"
                            placeholder="Nhập lại mật khẩu của bạn"
                            value={checkPass}
                            onChange={(e) => setCheckPass(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Đăng ký</button>
                </form>
                <p>
                    Bạn đã có tài khoản KHT Cinema? <a href="/login">Đăng nhập thôi !</a>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
