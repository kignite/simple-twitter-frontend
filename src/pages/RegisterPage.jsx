import React, { useEffect } from "react";
import { useState } from "react";
import { Input } from "../components/AuthInput";
import { BrandLogo } from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { AccountFormPage, AccountFormContainer } from "./LoginPage";
import {
  StyledBigButton,
  StyledLinkText,
} from "../components/common/button.styled";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [name, setName] = useState("");
  const { regist, isAuthenticated } = useAuth();
  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();

  const handleClick = async () => {
    const { success, errorMessage } = await regist({
      email,
      account,
      password,
      checkPassword,
      name,
    });
    if (success) {
      Swal.fire({
        position: "top",
        title: "註冊成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
    }
    if (!success) setErrorMessage(errorMessage.message);
    else navigate("/login");
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/main");
  }, [isAuthenticated, navigate]);

  return (
    <AccountFormPage>
      <AccountFormContainer>
        <BrandLogo />
        <h3>建立你的帳號</h3>
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
          type={"text"}
          label={"名稱"}
          value={name}
          placeholder={"請輸入名稱"}
          errorMessage={errorMessage.name || null}
          onChange={(nameInputValue) => {
            setName(nameInputValue);
            setErrorMessage({ ...errorMessage, name: null });
          }}
        />
        <Input
          type={"email"}
          label={"Email"}
          value={email}
          placeholder={"請輸入Email"}
          errorMessage={errorMessage.email || null}
          onChange={(nameInputValue) => {
            setEmail(nameInputValue);
            setErrorMessage({ ...errorMessage, email: null });
          }}
        />
        <Input
          type={"password"}
          label={"密碼"}
          value={password}
          placeholder={"請設定密碼"}
          errorMessage={errorMessage.password || null}
          onChange={(nameInputValue) => {
            setPassword(nameInputValue);
            setErrorMessage({ ...errorMessage, password: null });
          }}
        />
        <Input
          type={"password"}
          label={"密碼確認"}
          value={checkPassword}
          placeholder={"請再次輸入密碼"}
          errorMessage={errorMessage.passwordCheck || null}
          onChange={(nameInputValue) => {
            setCheckPassword(nameInputValue);
            setErrorMessage({ ...errorMessage, passwordCheck: null });
          }}
        />
        <StyledBigButton className="form-btn" onClick={handleClick}>
          註冊
        </StyledBigButton>
        <Link to="/login">
          <StyledLinkText className="cancel-btn">取消</StyledLinkText>
        </Link>
      </AccountFormContainer>
    </AccountFormPage>
  );
};

export default RegisterPage;
