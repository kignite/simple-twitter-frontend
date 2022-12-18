import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import PopularUserList from "./popular/PopularUserList";
import Sidebar from "./Sidebar";
import Backdrop from "./Backdrop";
import Modal from "./common/Modal";
import { getUserInfo } from "../api/getUserTweets";

const StyledLayoutContainer = styled.div`
  width: 1140px;
  height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 3fr 640px 4fr;

  .outlet {
    position: relative;
  }

  @media screen and (min-width: 992px) and (max-width: 1199px) {
    width: 960px;
    grid-template-columns: 3fr 5fr 4fr;
  }
`;

const Layout = () => {
  const token = localStorage.getItem("token");
  const [active, setActive] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({});
  useEffect(() => {
    const getdata = async () => {
      const data = await getUserInfo({ token });
      setPersonalInfo(data);
    };
    getdata();
  }, []);

  return (
    <StyledLayoutContainer>
      <Sidebar setActive={setActive} />
      <div className="outlet">
        <Backdrop active={active} setActive={setActive} />
        <Modal
          active={active}
          setActive={setActive}
          personalInfo={personalInfo}
        />
        <Outlet />
      </div>
      <PopularUserList />
    </StyledLayoutContainer>
  );
};

export default Layout;
