import React, { useEffect } from "react";
import { useState } from "react";
import { login } from "../api/auth";
import Input from "../components/AuthInput";
import { AccountFormPage, AccountFormContainer } from "./LoginPage";
import { StyledBigButton, StyledLinkText } from "../components/common/button.styled";
import { BrandLogo } from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";

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
      navigate("/admin_main");
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
    <AccountFormPage>
      <AccountFormContainer>
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
        <StyledBigButton className="form-btn" onClick={handleClick}>登入</StyledBigButton>
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
