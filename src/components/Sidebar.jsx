import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyledBigButton } from "./common/button.styled";
import {
  BrandLogo,
  ProfileIcon,
  SettingIcon,
  HomeIconActive,
  LogoutIcon,
} from "../assets/icons";
import { useAuth } from "../contexts/AuthContext";

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

const Sidebar = ({ setActive }) => {
  const { logout } = useAuth();

  const handleClick = () => {
    logout();
  };

  return (
    <>
      <StyledSidebarContainer>
        <BrandLogo className="logo" />
        <StyledLinkContainer>
          <HomeIconActive />
          <Link to="home">首頁</Link>
        </StyledLinkContainer>
        <StyledLinkContainer>
          <ProfileIcon />
          <Link to="user/self">個人資料</Link>
        </StyledLinkContainer>
        <StyledLinkContainer>
          <SettingIcon />
          <Link to="setting">設定</Link>
        </StyledLinkContainer>
        <StyledBigButton
          onClick={() => {
            setActive(true);
          }}
        >
          推文
        </StyledBigButton>
        <StyledLinkContainer className="logout">
          <LogoutIcon />
          {/* 暫時使用，後續改為useEffect自動跳轉 */}
          <Link to="login" onClick={handleClick}>
            登出
          </Link>
        </StyledLinkContainer>
      </StyledSidebarContainer>
    </>
  );
};

export default Sidebar;
