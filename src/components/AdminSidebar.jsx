import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  BrandLogo,
  ProfileIcon,
  HomeIconActive,
  LogoutIcon,
} from "../assets/icons";
import { useAuth } from "../contexts/AuthContext";

const StyledSidebarContainer = styled.div`
  position: sticky; //還沒資料看不出效果
  top: 0;
  margin-right: 24px;
  width: 178px;
  height: 100%;
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
  const { logout, isAuthenticated, currentMember } = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    logout();
  };
  useEffect(() => {
    if (isAuthenticated && currentMember.role === "user") {
      navigate("/main");
      return;
    } else if (!isAuthenticated) {
      navigate("/admin");
      return;
    }
  }, [navigate, isAuthenticated]);
  return (
    <StyledSidebarContainer>
      <BrandLogo className="logo" />
      <StyledLinkContainer>
        <HomeIconActive />
        <Link to="/admin_main">推文清單</Link>
      </StyledLinkContainer>
      <StyledLinkContainer>
        <ProfileIcon />
        <Link to="/admin_users">使用者列表</Link>
      </StyledLinkContainer>
      <StyledLinkContainer className="logout">
        <LogoutIcon />
        {/* 暫時使用，後續改為useEffect自動跳轉 */}
        <Link to="/admin" onClick={handleClick}>
          登出
        </Link>
      </StyledLinkContainer>
    </StyledSidebarContainer>
  );
};

export default AdminSidebar;
