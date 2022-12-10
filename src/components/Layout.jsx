import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import PopularUserList from "./PopularUserList";

const StyledLayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 640px 4fr;
  border: 1px solid red;
`;

const Layout = () => {
  return (
    <StyledLayoutContainer>
      {/* Sidebar */}
      <Outlet />
      <PopularUserList />
    </StyledLayoutContainer>
  );
};

export default Layout;
