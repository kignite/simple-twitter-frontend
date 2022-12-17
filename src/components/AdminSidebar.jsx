import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  BrandLogo,
  ProfileIcon,
  HomeIconActive,
  LogoutIcon,
} from "../assets/icons";

const StyledSidebarContainer = styled.div`
  position: relative;
  /* grid-column: 1 / 2; */
  /* margin-right: 24px; */
  width: 178px;
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

const AdminSidebar = () => {
  const handleClick = () => {
    // console.log("hi")
    localStorage.removeItem("token");
  };
  return (
    <StyledSidebarContainer>
      <BrandLogo className="logo" />
      <StyledLinkContainer>
        <HomeIconActive />
        <Link to="home">推文清單</Link>
      </StyledLinkContainer>
      <StyledLinkContainer>
        <ProfileIcon />
        <Link to="user/self">使用者列表</Link>
      </StyledLinkContainer>
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

export default AdminSidebar;
