import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useState } from "react";
// import * as jwt from "jsonwebtoken";
import { acountSetting, getAccountSetting } from "../api/auth";
import Input from "../components/AuthInput";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import jwt from "jwt-decode";

const SettingStyle = styled.div`
  width: 1148px;
  height: 1200px; //待調整
  margin: 0 auto;
  border: 1px solid red;
  display: grid;
  grid-template-columns: 3fr 640px 4fr; ;
`;

const SettingContainerStyle = styled.div`
  //待修改
  .input-collection {
    margin: 0 auto;

    * {
      margin: 16px auto;
    }

    div:first-child {
      margin-top: 24px;
    }
  }

  display: grid;
  grid-template-rows: 74px 1fr;
  border: 1px solid #e6ecf0;

  h3 {
    font-weight: 700;
    font-size: 24px;
    border-bottom: 1px solid #e6ecf0;
    padding: 24px 0 24px 24px;
  }

  .save-button {
    
  }
`;

const AccountSetting = () => {
  const [email, setEmail] = useState(null);
  const [account, setAccount] = useState(null);
  const [password, setPassword] = useState(null);
  const [checkPassword, setCheckPassword] = useState(null);
  const [name, setName] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userID = jwt(token).id;
  // const [test, setTest] = useState("");

  const handleClick = async () => {
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
    const { success } = await acountSetting({
      userID,
      token,
      email,
      account,
      password,
      checkPassword,
      name,
    });
    if (success) {
      console.log("修改成功");
      navigate("/");
    } else {
      console.log("修改失敗");
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getAccountSetting({ userID, token });
      setAccount(data.account);
      setName(data.name);
      setEmail(data.email);
    };
    getData();
  }, []);

  return (
    <SettingStyle>
      <Sidebar />
      <SettingContainerStyle>
        <h3>帳戶設定</h3>
        <div className="input-collection">
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
          <button className="save-btn" onClick={handleClick}>儲存</button>
        </div>
      </SettingContainerStyle>
      <div></div>
    </SettingStyle>
  );
};

export default AccountSetting;
