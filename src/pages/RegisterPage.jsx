import React from "react";
// import { Link } from "react-router-dom";
import Input from "../components/Input";
const RegisterPage = () => {
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
      <Input
        type={"text"}
        label={"Email"}
        // value={"password"}
        placeholder={"請輸入Email"}
      />
      <Input
        type={"text"}
        label={"密碼"}
        // value={"password"}
        placeholder={"請設定密碼"}
      />
      <Input
        type={"text"}
        label={"密碼確認"}
        // value={"password"}
        placeholder={"請再次輸入密碼"}
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
