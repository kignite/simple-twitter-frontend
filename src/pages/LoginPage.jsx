import React, { useEffect } from "react";
import { useState } from "react";
// import { Link } from "react-router-dom";
import Input from "../components/Input";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    console.log("click");
  };

  useEffect(() => {
    if (username && password) {
      console.log(username);
      console.log(password);
    }
  }, [username, password]);
  return (
    <>
      <div className="icon">@</div>
      <h3>登入 Alphitter</h3>
      <Input
        type={"text"}
        label={"帳號"}
        value={username}
        placeholder={"請輸入帳號"}
        onChange={(nameInputValue) => setUsername(nameInputValue)}
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
