import React from "react";
import { useState } from "react";
import axios from "axios";
import LoginForm from "../components/Login/LoginForm";
import Swal from "sweetalert2";
import { setToken } from "./Services/Autherize";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      // เรียกข้อมูล username password จาก database
      const response = await axios.post(
        `http://localhost:5500/auth/login`,
        {
          username,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      // รับ token จาก database
      const { token, user } = response.data;
      // เก็บ token ลงใน session storage
      setToken(token, user.username);
      Swal.fire({
        title: "Success!",
        text: "Logged in successfully.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      }).then(() => {
        //เมื่อกด login จะ route ไปยัง หน้า inventory
        navigate("/inventory");
      });
    } catch (error) {
      // error ว่าไม่มี user นี้ใน database
      if (error.response && error.response.status === 404) {
        setErrorMessage("User not found");
        //error ว่าusername หรือ password ไม่ตรง
      } else if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid username or password");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again");
      }
    }
  };

  return (
    <div>
      {/* ส่ง props ไปยัง loginForm */}
      <LoginForm onLogin={handleLogin} errorMessage={errorMessage} />
    </div>
  );
};

export default Login;
