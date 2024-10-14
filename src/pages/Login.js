import React, { useState } from 'react';
import axios from 'axios';
import './styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Gọi API đăng nhập
      const response = await axios.post('http://localhost:8080/auth/login', {
        username,
        password,
      });

      const token = response.data;
      if (token != null && token.error == null){
        console.log("data receive: " , token)
        console.log("ac_token: " ,token.data.access_token)
        console.log("rf_token: " ,token.data.refresh_token)
        alert('Đăng nhập thành công!');
        sessionStorage.setItem("userName", username)
        window.location.href = '/movie';
      } else{
        setError("Tên đăng nhập hoặc mật khẩu không đúng!")
      }
      // Lưu token vào localStorage hoặc sessionStorage nếu người dùng chọn "Nhớ mật khẩu"
      // if (remember) {
      //   localStorage.setItem('token', token);
      // } else {
      //   sessionStorage.setItem('token', token);
      // }
    } catch (error) {
      // Xử lý lỗi nếu thông tin đăng nhập sai hoặc không kết nối được với server
      // if (error.response) {
      //   setError('Tên đăng nhập hoặc mật khẩu không đúng!');
      // } else {
      //   setError('Có lỗi xảy ra khi kết nối đến server.');
      // }
      console.log(error)
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>CHÀO MỪNG TRỞ LẠI VỚI</h2>
        <h1>KHTCinema</h1>
        <form onSubmit={handleLogin}>
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
          <div className="options">
            <div>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label>Nhớ mật khẩu</label>
            </div>
            <a href="/forgot-password">Quên mật khẩu?</a>
          </div>
          {error && <p className="error" >{error}</p>}
          <button type="submit">Đăng nhập</button>
        </form>
        <p>
          Bạn chưa có tài khoản KHT Cinema? <a href="/signup">Đăng ký ngay</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
