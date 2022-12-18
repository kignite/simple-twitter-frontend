import React, { useEffect } from "react";
import { useState } from "react";
import { login } from "../api/auth";
// import { Link } from "react-router-dom";
import Input from "../components/AuthInput";
import styled from "styled-components";
import { BrandLogo } from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { StyledBigButton, StyledLinkText } from "../components/common/button.styled";

export const AccountFormPage = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export const AccountFormContainer = styled.div`
  //待修改
  position: relative;
  width: 364px;
  top: 60px;

  text-align: center;
  h3 {
    margin: 29px 0 40px 0;
  }
  .form-btn {
    margin-top: 8px;
  }
  .user-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 22px;
  }
  .cancel-btn {
    margin-top: 22px;
    margin-bottom: 60px;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [password, setPassword] = useState(null);
  const role = "users";
  // const [error, setError] = useState("");

  const handleClick = async () => {
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }

    const { success, token } = await login(
      {
        account,
        password,
      },
      role
    );
    if (success) {
      localStorage.setItem("token", token);
      navigate("home");
    } else {
      //待補失敗處理
      console.log("登入失敗");
    }
  };

  useEffect(() => {
    // if (username && password) {
    //   console.log(username);
    //   console.log(password);
    // }
  }, []);
  return (
    <AccountFormPage>
      <AccountFormContainer>
        <BrandLogo className="logo" />
        <h3>登入 Alphitter</h3>
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
        <StyledBigButton className="form-btn" onClick={handleClick}>登入</StyledBigButton>
        <div className="user-actions">
          <Link to="/regist">
            <StyledLinkText>註冊</StyledLinkText>
          </Link>
          <div>‧</div>
          <Link to="/admin">
            <StyledLinkText>後台登入</StyledLinkText>
          </Link>
        </div>
      </AccountFormContainer>
    </AccountFormPage>
  );
};

export default LoginPage;
