import React, { useEffect } from "react";
import { useState } from "react";
// import { login } from "../api/auth";
// import { Link } from "react-router-dom";
import { Input } from "../components/AuthInput";
import styled from "styled-components";
import { BrandLogo } from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  StyledBigButton,
  StyledLinkText,
} from "../components/common/button.styled";
import { useAuth } from "../contexts/AuthContext";

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
  const { login, isAuthenticated, currentMember } = useAuth();
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const role = "users";

  const handleClick = async () => {
    if (account.length === 0 && password.length === 0) {
      setErrorMessage({
        ...errorMessage,
        account: "請輸入帳號",
        password: "請輸入密碼",
      });

      return;
    }
    if (account.length === 0) {
      setErrorMessage({ ...errorMessage, account: "請輸入帳號" });
      return;
    }
    if (password.length === 0) {
      setErrorMessage({ ...errorMessage, password: "請輸入密碼" });
      return;
    }
    const { success } = await login(
      {
        account,
        password,
      },
      role
    );
    if (!success) {
      setErrorMessage({
        ...errorMessage,
        account: "帳號或密碼錯誤",
        password: "帳號或密碼錯誤",
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (currentMember.role === "user") {
        navigate("/main");
      } else {
        navigate("/adimn_main");
      }
    }
  }, [navigate, isAuthenticated]);
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
          errorMessage={errorMessage.account || null}
          onChange={(nameInputValue) => {
            setAccount(nameInputValue);
            setErrorMessage({ ...errorMessage, account: null });
          }}
        />
        <Input
          type={"password"}
          label={"密碼"}
          value={password}
          placeholder={"請輸入密碼"}
          errorMessage={errorMessage.password || null}
          onChange={(nameInputValue) => {
            setPassword(nameInputValue);
            setErrorMessage({ ...errorMessage, password: null });
          }}
        />
        <StyledBigButton className="form-btn" onClick={handleClick}>
          登入
        </StyledBigButton>
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
