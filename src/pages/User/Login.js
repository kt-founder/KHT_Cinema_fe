import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import LoadingComponent from "../../components/LoadingComponent";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      // Gọi API đăng nhập
      const response = await axios.post('http://localhost:8080/auth/login-user', {
        username,
        password,
      });

      const token = response.data;
      if (token != null && token.error == null){
        console.log("data receive: " , token)
        console.log("ac_token: " ,token.data.access_token)
        console.log("rf_token: " ,token.data.refresh_token)
        sessionStorage.setItem("userName", username)
        sessionStorage.setItem("HKT_ACCESS_TOKEN_USER",token.data.access_token)
        window.location.href = '/';
      } else{
        setError("Tên đăng nhập hoặc mật khẩu không đúng!")
      }

    } catch (error) {

      console.log(error)
    } finally {
      setIsLoading(false)
    }
  };
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="login-container">
      {isLoading && <LoadingComponent />}
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
            {/*<input*/}
            {/*  type="password"*/}
            {/*  placeholder="Nhập mật khẩu của bạn"*/}
            {/*  value={password}*/}
            {/*  onChange={(e) => setPassword(e.target.value)}*/}
            {/*  required*/}
            {/*/>*/}
            <div style={{position: "relative"}}>
              <input
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Nhập mật khẩu của bạn"
              />
              <span
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "0px",
                    top: "45%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#f4f3f3",
                  }}>
              {passwordVisible ? (
                  <i className="fa fa-eye-slash"></i>
              ) : (
                  <i className="fa fa-eye"></i>
              )}
            </span>
            </div>
          </div>
          <div className="options">
            <div style={{visibility: 'hidden'}}>
              <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
              />
              {/*<label>Nhớ mật khẩu</label>*/}
            </div>
            <a href="/forgot-password">Quên mật khẩu?</a>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Đăng nhập</button>
        </form>
        <p>
          Bạn chưa có tài khoản KHT Cinema? <a href="/SignUp">Đăng ký ngay</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
