import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ onLogin, errorMessage }) => { // รับ props มาจาก login

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    // โครงสร้างรวม form ของ login
    <div className="container_form">
      <div className="header_form">
        {" "}
        {/* หัวเรื่อง form */}
        <h1>Warehouse</h1>
      </div>
      {/* ช่อง input ใส่ค่า username และ password */}
      <form className="input_form" onSubmit={handleSubmit}>
        <div>
          <div className="input_form_header">
            <p>Username</p>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <div className="input_form_header">
            <p>Password</p>
          </div>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="error_message">{errorMessage}</p>}
        {/* ปุ่ม Login */}
        <div className="button_form">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
