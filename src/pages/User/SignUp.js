import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SignUp.css';
import LoadingComponent from "../../components/LoadingComponent";

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [checkPass, setCheckPass] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true)
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
                        {/*<input*/}
                        {/*    type="password"*/}
                        {/*    placeholder="Nhập mật khẩu của bạn"*/}
                        {/*    value={password}*/}
                        {/*    onChange={(e) => setPassword(e.target.value)}*/}
                        {/*    required*/}
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
                                }}
                            >
                            {passwordVisible ? (
                                <i className="fa fa-eye-slash"></i>
                            ) : (
                                <i className="fa fa-eye"></i>
                            )}
                          </span>
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Nhập lại mật khẩu*</label>
                        {/*<input*/}
                        {/*    type="password"*/}
                        {/*    placeholder="Nhập lại mật khẩu của bạn"*/}
                        {/*    value={checkPass}*/}
                        {/*    onChange={(e) => setCheckPass(e.target.value)}*/}
                        {/*    required*/}
                        {/*/>*/}
                        <div style={{position: "relative"}}>
                            <input
                                required
                                value={checkPass}
                                onChange={(e) => setCheckPass(e.target.value)}
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Nhập lại mật khẩu của bạn"
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
                                }}
                            >
                            {passwordVisible ? (
                                <i className="fa fa-eye-slash"></i>
                            ) : (
                                <i className="fa fa-eye"></i>
                            )}
                          </span>
                        </div>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Đăng ký</button>
                </form>
                <p>
                    Bạn đã có tài khoản KHT Cinema? <a href="/Login">Đăng nhập thôi !</a>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
