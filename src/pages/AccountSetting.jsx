import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useState } from "react";
// import * as jwt from "jsonwebtoken";
import { acountSetting, getAccountSetting } from "../api/auth";
import { Input } from "../components/AuthInput";
import styled from "styled-components";
// import Sidebar from "../components/Sidebar";
import { StyledButton } from "../components/common/button.styled";
import jwt from "jwt-decode";
import Backdrop from "../components/Backdrop";
import Modal from "../components/common/Modal";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";

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
  const { isAuthenticated, currentMember } = useAuth();
  const [errorMessage, setErrorMessage] = useState({});
  // const navigate = useNavigate();
  const token = localStorage.getItem("token") || null;
  let userID;

  // const [test, setTest] = useState("");

  const handleClick = async () => {
    userID = jwt(token).id;

    const { success, errorMessage } = await acountSetting({
      userID,
      token,
      email,
      account,
      password,
      checkPassword,
      name,
    });
    if (!success) {
      setErrorMessage(errorMessage.message);
      Swal.fire({
        position: "top",
        title: "設定失敗",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        position: "top",
        title: "設定成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getAccountSetting({ userID, token });
      setAccount(data.account);
      setName(data.name);
      setEmail(data.email);
    };
    if (!isAuthenticated || currentMember.role !== "user") return;
    userID = jwt(token).id;

    getData();
  }, [isAuthenticated]);

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
          <StyledButton className="save-btn active" onClick={handleClick}>
            儲存
          </StyledButton>
        </div>
      </SettingContainerStyle>
      <div></div>
    </SettingStyle>
  );
};

export default AccountSetting;
