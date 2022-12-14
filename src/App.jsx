import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AccounntSetting from "./pages/AccountSetting";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import AdminMainPage from "./pages/AdminMainPage";
import AdminUserList from "./pages/AdminUserList";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="admin" element={<AdminLoginPage />} />
          <Route path="admin_main" element={<AdminMainPage />} />
          <Route path="admin_users" element={<AdminUserList />} />
          <Route path="regist" element={<RegisterPage />} />
          <Route path="setting" element={<AccounntSetting />} />
          {/* <Route path="/" element={<Layout />}/> */}
          <Route path="" element={<Layout />}>
            <Route path="main" element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
            <Route path="user/self" element={<UserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
