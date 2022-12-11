import React from "react";
// import { Link } from "react-router-dom";
import Input from "../components/Input";
const LoginPage = () => {
  const handleClick = () => {
    console.log("click");
  };

  return (
    <>
      <div className="icon">@</div>
      <h3>登入 Alphitter</h3>
      <Input
        type={"text"}
        label={"帳號"}
        // value={"username"}
        placeholder={"請輸入帳號"}
      />
      <Input
        type={"text"}
        label={"密碼"}
        // value={"password"}
        placeholder={"請輸入密碼"}
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
