import React from "react";
import styled from "styled-components";
import { BrandLogo, HomeIcon } from "../assets/icons";

const StyledSidebarContainer = styled.div`
  width: 178px;
`;

const StyledLinkContainer = styled.div`
  width: 100%;
  .icon {
  }
  a {
  }
`;

const Sidebar = () => {
  return (
    <StyledSidebarContainer>
      <BrandLogo />
      <StyledLinkContainer>
        <HomeIcon className="icon" />
        <a href="">首頁</a>
      </StyledLinkContainer>
      <div>
        <div>icon</div>
        <a href="">個人資料</a>
      </div>
      <div>
        <div>icon</div>
        <a href="">設定</a>
      </div>
      <button>推文</button>
      <div>
        <div>icon</div>
        <a href="">登出</a>
      </div>
    </StyledSidebarContainer>
  );
};

export default Sidebar;
