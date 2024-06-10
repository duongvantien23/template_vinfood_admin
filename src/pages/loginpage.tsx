import React, { useState, useEffect } from "react";
import OrderModel from "../models/order.model"; 
import { login } from '../services/login.services';
import "../assets/Css/login.css";

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
  
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    };
  
    const handleLogin = async () => {
      try {
        const token = await login(username, password);
        if (token) {
          console.log("Đăng nhập thành công!");
          window.location.href = "/sanpham";
        } else {
          setError("Tài khoản hoặc mật khẩu không đúng");
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi đăng nhập:", error);
        setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau");
      }
    };
  
    return (
      <div className="wrapper login">
        <div className="container">
          <div className="col-left">
            <div className="login-text">
              <img src="../Img/logo.png" alt="" />
              <h2>Xin chào</h2>
              <p>
                Chúc bạn
                <br />
                một ngày mới tốt lành
              </p>
            </div>
          </div>
          <div className="col-right">
            <div className="login-form">
              <h2>Đăng Nhập Hệ Thống</h2>
              <form>
                <p>
                  <label htmlFor="username">Tài khoản<span>*</span></label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Tài khoản"
                    value={username}
                    onChange={handleUsernameChange}
                    autoComplete="current-user"
                  />
                </p>
                <p>
                  <label htmlFor="password">Mật khẩu<span>*</span></label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                  />
                </p>
                <p>
                  <button className="btn-login" type="button" onClick={handleLogin}>
                    Đăng nhập
                  </button>
                </p>
                {error && <p className="error-message">{error}</p>}
                <p>
                  <a href="#">Quên mật khẩu</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;