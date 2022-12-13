import React from "react";
// import { Link } from "react-router-dom";
import { useState } from "react";
import { regist } from "../api/auth";
import Input from "../components/AuthInput";
import styled from "styled-components";
import { BrandLogo } from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";
// ;
const RegistPage = styled.div`
  width: 1148px;
  height: 100%;
  margin: 0 auto;
  border: 1px solid red;
  display: flex;
  justify-content: center;
`;

const RegistPageContainer = styled.div`
  //待修改
  * {
    margin: 10px 0;
  }

  a {
    margin: 0 10px;
  }
`;

const RegisterPage = () => {
  const [email, setEmail] = useState(null);
  const [account, setAccount] = useState(null);
  const [password, setPassword] = useState(null);
  const [checkPassword, setCheckPassword] = useState(null);
  const [name, setName] = useState(null);
  const navigate = useNavigate();

  const handleClick = async () => {
    // if (password !== checkPassword) return;
    if (account.length === 0) {
      return;
    }
    if (name.length === 0) {
      return;
    }
    if (email.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    if (checkPassword.length === 0) {
      return;
    }
    const { success } = await regist({
      email,
      account,
      password,
      checkPassword,
      name,
    });
    if (success) {
      console.log(success);

      console.log("註冊成功");
      navigate("/");
    } else {
      console.log("註冊失敗");
    }
  };

  return (
    <RegistPage>
      <RegistPageContainer>
        <BrandLogo />
        <h3>建立你的帳號</h3>
        <Input
          type={"text"}
          label={"帳號"}
          value={account}
          placeholder={"請輸入帳號"}
          onChange={(nameInputValue) => setAccount(nameInputValue)}
        />
        <Input
          type={"text"}
          label={"名稱"}
          value={name}
          placeholder={"請輸入名稱"}
          onChange={(nameInputValue) => setName(nameInputValue)}
        />
        <Input
          type={"email"}
          label={"Email"}
          value={email}
          placeholder={"請輸入Email"}
          onChange={(nameInputValue) => setEmail(nameInputValue)}
        />
        <Input
          type={"password"}
          label={"密碼"}
          value={password}
          placeholder={"請設定密碼"}
          onChange={(nameInputValue) => setPassword(nameInputValue)}
        />
        <Input
          type={"password"}
          label={"密碼確認"}
          value={checkPassword}
          placeholder={"請再次輸入密碼"}
          onChange={(nameInputValue) => setCheckPassword(nameInputValue)}
        />
        <button onClick={handleClick}>註冊</button>
        <Link to="/login">取消</Link>
      </RegistPageContainer>
    </RegistPage>
  );
};

export default RegisterPage;
