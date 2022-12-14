import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  BrandLogo,
  ProfileIcon,
  SettingIcon,
  HomeIconActive,
  LogoutIcon
} from "../assets/icons";

const StyledSidebarContainer = styled.div`
  position: relative;
  grid-column: 1 / 2;
  width: 178px;
  margin-right: 24px;
  .logo {
    margin: 13px;
  }
`;

const StyledLinkContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px;

  a {
    margin-left: 20px;

    color: var(--nav-unactive_gray);
    text-decoration: none;
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
    &.active {
      color: var(--main_orange);
    }
  }

  &.logout {
    position: absolute;
    bottom: 0;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 8px 0;
  border-radius: 50px;
  border: none;

  font-size: 20px;
  font-weight: 400;

  color: var(--main_white);
  background-color: var(--main_orange);
`;

const Sidebar = () => {
  const handleClick = () => {
    // console.log("hi")
    localStorage.removeItem("token");
  };
  return (
    <StyledSidebarContainer>
      <BrandLogo className="logo" />
      <StyledLinkContainer>
        <HomeIconActive />
        <a className="active" href="">
          首頁
        </a>
      </StyledLinkContainer>
      <StyledLinkContainer>
        <ProfileIcon />
        <Link to="/user/self">
          個人資料
        </Link>
      </StyledLinkContainer>
      <StyledLinkContainer>
        <SettingIcon />
        <Link to="setting">
          設定
        </Link>
      </StyledLinkContainer>
      <StyledButton>推文</StyledButton>
      <StyledLinkContainer className="logout">
        <LogoutIcon />
        {/* 暫時使用，後續改為useEffect自動跳轉 */}
        <Link to="login" onClick={handleClick}>
          登出
        </Link>
      </StyledLinkContainer>
    </StyledSidebarContainer>
  );
};

export default Sidebar;
