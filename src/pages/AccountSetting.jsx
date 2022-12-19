import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useState } from "react";
// import * as jwt from "jsonwebtoken";
import { acountSetting, getAccountSetting } from "../api/auth";
import { Input } from "../components/AuthInput";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
import { StyledButton } from "../components/common/button.styled";
import jwt from "jwt-decode";
import Backdrop from "../components/Backdrop";
import Modal from "../components/common/Modal";

const SettingStyle = styled.div`
  width: 100%;
  height: 100vh; 
  margin: 0 auto;
`;

const SettingContainerStyle = styled.div`
  width: 100%;
  height: 100vh;
  border-left: 1px solid var(--border_gray);
  border-right: 1px solid var(--border_gray);

  .input-collection {
    position: relative;
    padding: 24px;
    .save-btn {
      position: absolute;
      right: 24px;
    }
  }
  header {
    height: 74px;
    padding-left: 24px;
    border-bottom: 1px solid var(--border_gray);
    h4 {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

const AccountSetting = () => {
  //Modal 開關
  const [active, setActive] = useState(false);

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
      {/* <Sidebar setActive={setActive} /> */}
      <SettingContainerStyle>
        <Backdrop active={active} setActive={setActive} />
        <Modal active={active} setActive={setActive} />
        <header>
          <h4>帳戶設定</h4>
        </header>
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
          <StyledButton className = "save-btn active" onClick={handleClick}>儲存</StyledButton>
        </div>
      </SettingContainerStyle>
      <div></div>
    </SettingStyle>
  );
};

export default AccountSetting;
