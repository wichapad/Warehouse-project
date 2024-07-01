import React from "react";

import {
  // eslint-disable-next-line
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./auth/Login";
import Inventory from "./components/Inventory/Inventory";
import Receive from "./components/Products/Receive";
import { getToken } from "./auth/Services/Autherize";
import Picking from "./components/Picking/Picking";
import Home from "./pages/Home";

// private route ใช้สำหรับเส้นทางให้ user login ก่อน หากไม่มี token จะเปลี่ยนไป /login
const PrivateRoute = ({ element }) => {
  const token = getToken();
  return token ? element : <Navigate to="/login" />;
};

// plublic route ใช้สำหรับเส้นทางไม่ให้ user เข้า path /login หากยังมี token อยู่ จะไปยัง path /inventory
const PublicRoute = ({ element }) => {
  const token = getToken();
  return token ? <Navigate to="/inventory" /> : element;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute element={<Login />} />} />
      <Route  element={<PrivateRoute element={<Home />} />}>
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/receive" element={<Receive />} />
        <Route path="/picking" element={<Picking />} />
      </Route>
      <Route path="*" element={<Navigate to="/inventory" />} />
    </Routes>
  );
}

export default App;
