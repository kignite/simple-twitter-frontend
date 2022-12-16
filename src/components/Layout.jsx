import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import PopularUserList from "./popular/PopularUserList";
import Sidebar from "./Sidebar";


const StyledLayoutContainer = styled.div`
  width: 1140px;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 640px 4fr;

  @media screen and (min-width: 992px) and (max-width: 1199px) 
  {
    width: 960px;
    grid-template-columns: 3fr 5fr 4fr;
  }
`;

const Layout = () => {
  return (
    <StyledLayoutContainer>
      <Sidebar />
      <Outlet />
      <PopularUserList />
    </StyledLayoutContainer>
  );
};

export default Layout;
