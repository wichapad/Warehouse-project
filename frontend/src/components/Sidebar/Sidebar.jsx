import React from "react";
import "./sidebar.css";
import { removeToken } from "../../auth/Services/Autherize";
import {  useNavigate } from "react-router-dom";

const Sidebar = () => {
  const username = sessionStorage.getItem("user_session_user");

  const navigate = useNavigate();
  //function ปุ่ม logout
  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  const handleRecive = () => {
    navigate("/receive");
  };
  const handleInventory = () => {
    navigate("/inventory");
  };
  const handlePicking = () => {
    navigate("/picking");
  };

  return (
    <div className="sidebar_container">
      <div>
        <div className="sidebar_header">
          <h1>Warehouse</h1>
        </div>
        <div className="sidebar_menu">
          <button onClick={handleRecive}>Recive</button>
          <button onClick={handlePicking}>Picking</button>
          <button onClick={handleInventory}>Stock</button>
        </div>
      </div>
      <div className="sidebar_logout">
        <p>User: {username}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
