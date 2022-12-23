import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { StyledBigButton } from "./common/button.styled";
import {
  BrandLogo,
  ProfileIcon,
  ProfileIconActive,
  SettingIcon,
  SettingIconActive,
  HomeIcon,
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
    display: flex;
    align-items: center;
    color: var(--nav-unactive_gray);
    text-decoration: none;
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;

    span {
      margin-left: 20px;
      color: inherit;
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
          <NavLink to="main" style={({ isActive }) => ({ color: isActive && '#FF6600' })}>
            {({ isActive }) => (
              isActive ?
              <>
                <HomeIconActive />
                <span>首頁</span>
              </>
              :
              <>
                <HomeIcon />
                <span>首頁</span>
              </>
            )}
          </NavLink>
        </StyledLinkContainer>
        <StyledLinkContainer>
          <NavLink to="user/self" style={({ isActive }) => ({ color: isActive && '#FF6600' })}>
            {({ isActive }) => (
              isActive ?
              <>
                <ProfileIconActive />
                <span>個人資料</span>
              </>
              :
              <>
                <ProfileIcon />
                <span>個人資料</span>
              </>
            )}
          </NavLink>
        </StyledLinkContainer>
        <StyledLinkContainer>
          <NavLink to="setting" style={({ isActive }) => ({ color: isActive && '#FF6600' })}>
            {({ isActive }) => (
              isActive ?
              <>
                <SettingIconActive />
                <span>設定</span>
              </>
              :
              <>
                <SettingIcon />
                <span>設定</span>
              </>
            )}
          </NavLink>
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
