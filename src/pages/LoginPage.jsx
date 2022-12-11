import React, { useEffect } from "react";
import { useState } from "react";
import { login } from "../api/auth";
// import { Link } from "react-router-dom";
import Input from "../components/Input";

const LoginPage = () => {
  const [account, setAccount] = useState(null);
  const [password, setPassword] = useState(null);
  // const [error, setError] = useState("");

  const handleClick = async () => {
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }

    const { error, success, token } = await login({
      account,
      password,
    });
    if (success) {
      localStorage.setItem("token", token);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    // if (username && password) {
    //   console.log(username);
    //   console.log(password);
    // }
  }, []);
  return (
    <>
      <div className="icon">@</div>
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
      <button onClick={handleClick}>登入</button>
      <div>
        {/* <Link to="/"> */}
        <div>註冊</div>
        <div>後台登入</div>
        {/* </Link> */}
      </div>
    </>
  );
};

export default LoginPage;
