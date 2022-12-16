import React, { useEffect } from "react";
import { useState } from "react";
import { login } from "../api/auth";
// import { Link } from "react-router-dom";
import Input from "../components/AuthInput";
import styled from "styled-components";
import { BrandLogo } from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";

const HomePage = styled.div`
  width: 1148px;
  height: 100%;
  margin: 0 auto;
  border: 1px solid red;
  display: flex;
  justify-content: center;
`;

const HomePageContainer = styled.div`
  //待修改
  * {
    margin: 10px 0;
  }

  a {
    margin: 0 10px;
  }
`;

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [password, setPassword] = useState(null);
  const role = "admin";
  // const [error, setError] = useState("");

  const handleClick = async () => {
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    console.log("a",account)
    console.log("p",password)

    const { success, token } = await login(
      {
        account,
        password,
      },
      role
    );
    if (success) {
      localStorage.setItem("token", token);
      navigate("/");
    } else {
      //待補失敗處理
      console.log(role, "登入失敗");
    }
  };

  useEffect(() => {
    // if (username && password) {
    //   console.log(username);
    //   console.log(password);
    // }
  }, []);
  return (
    <HomePage>
      <HomePageContainer>
        <BrandLogo className="logo" />
        <h3>後台登入</h3>
        <Input
          type={"text"}
          label={"帳號"}
          value={account}
          placeholder={"請輸入帳號"}
          onChange={(nameInputValue) => setAccount(nameInputValue)}
        />
        <Input
          type={"password"}
          label={"密碼"}
          value={password}
          placeholder={"請輸入密碼"}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
        <button onClick={handleClick}>登入</button>
        <div>
          <Link to="/login">前台登入</Link>
        </div>
      </HomePageContainer>
    </HomePage>
  );
};

export default AdminLoginPage;
