import React, { useEffect } from "react";
import { useState } from "react";
import { Input } from "../components/AuthInput";
import { AccountFormPage, AccountFormContainer } from "./LoginPage";
import {
  StyledBigButton,
  StyledLinkText,
} from "../components/common/button.styled";
import { BrandLogo } from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const { login, isAuthenticated, currentMember } = useAuth();
  const role = "admin";
  // const [error, setError] = useState("");

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
      Swal.fire({
        position: "top",
        title: "登入失敗",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        position: "top",
        title: "登入成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (currentMember.role === "admin") {
        navigate("/admin_main");
      } else {
        navigate("/main");
      }
    }
  }, [navigate, isAuthenticated]);

  return (
    <AccountFormPage>
      <AccountFormContainer>
        <BrandLogo className="logo" />
        <h3>後台登入</h3>
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
          <Link to="/login">
            <StyledLinkText>前台登入</StyledLinkText>
          </Link>
        </div>
      </AccountFormContainer>
    </AccountFormPage>
  );
};

export default AdminLoginPage;
