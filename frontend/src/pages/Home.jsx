import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "./home.css";
import { Outlet } from "react-router-dom";

const Home = () => {

  return (
    <div style={{ display: "flex"}}>
      <div style={{ width: "200px", position:"fixed"}}>
        <Sidebar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
