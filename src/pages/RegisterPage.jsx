import React from "react";
// import { Link } from "react-router-dom";
import { useState } from "react";
import { regist } from "../api/auth";
import Input from "../components/Input";

const RegisterPage = () => {
  const [email, setEmail] = useState(null);
  const [account, setAccount] = useState(null);
  const [password, setPassword] = useState(null);
  const [checkPassword, setCheckPassword] = useState(null);
  const [name, setName] = useState(null);
  const handleClick = async () => {
    if (password !== checkPassword) return;
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
    console.log(name);
    console.log(password);
    console.log(email);
    console.log(account);

    const { success } = await regist({
      email,
      account,
      password,
      checkPassword,
      name,
    });
    if (success) {
      console.log("註冊成功")
    } else {
      // console.log(error);
    }
  };

  return (
    <>
      <div className="icon">@</div>
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
      <div>
        {/* <Link to="/"> */}
        <div>取消</div>
        {/* </Link> */}
      </div>
    </>
  );
};

export default RegisterPage;
