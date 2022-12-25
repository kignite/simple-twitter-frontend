import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  BrandLogo,
  ProfileIcon,
  ProfileIconActive,
  HomeIcon,
  HomeIconActive,
  LogoutIcon,
} from "../assets/icons";
import { useAuth } from "../contexts/AuthContext";

const StyledSidebarContainer = styled.div`
  position: relative;
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
    a {
      margin-left: 20px;
    }
  }  
`;

const AdminSidebar = () => {
  const { logout, isAuthenticated, currentMember } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || null;

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    if (isAuthenticated && currentMember.role === "user") {
      navigate("/main");
      return;
    } else if (!token) {
      navigate("/admin");
      return;
    }
  }, [navigate, isAuthenticated]);
  return (
    <StyledSidebarContainer>
      <BrandLogo className="logo" />
      <StyledLinkContainer>
        <NavLink to="/admin_main" style={({ isActive }) => ({ color: isActive && '#FF6600' })}>
          {({ isActive }) => (
            isActive ?
            <>
              <HomeIconActive />
              <span>推文清單</span>
            </>
            :
            <>
              <HomeIcon />
              <span>推文清單</span>
            </>
          )}
        </NavLink>
      </StyledLinkContainer>
      <StyledLinkContainer>
        <NavLink to="/admin_users" style={({ isActive }) => ({ color: isActive && '#FF6600' })}>
          {({ isActive }) => (
            isActive ?
            <>
              <ProfileIconActive />
              <span>使用者列表</span>
            </>
            :
            <>
              <ProfileIcon />
              <span>使用者列表</span>
            </>
          )}
        </NavLink>
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
