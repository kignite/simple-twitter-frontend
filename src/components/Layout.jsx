import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PopularUserList from "./popular/PopularUserList";
import Sidebar from "./Sidebar";
import Backdrop from "./Backdrop";
import Modal from "./common/Modal";
import { getUserInfo } from "../api/getUserTweets";
import { useAuth } from "../contexts/AuthContext";
import jwtDecode from "jwt-decode";
//test
// import AccountSetting from "../pages/AccountSetting";

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

const Layout = ({onSettingPage = false, active, setActive}) => {
  const token = localStorage.getItem("token") || null;
  // //Modal的開關
  // const [active, setActive] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({});
  const navigate = useNavigate();

  const { isAuthenticated, currentMember } = useAuth();

  useEffect(() => {
    const getdata = async () => {
      const id = jwtDecode(token).id;
      const data = await getUserInfo({ token, id });
      setPersonalInfo(data);
    };

    if (!token) {
      navigate("/layout/login");
      return;
    }
    if (isAuthenticated && currentMember.role === "admin") {
      navigate("/admin_main");
      return;
    }

    getdata();
  }, [isAuthenticated]);

  return (
    <StyledLayoutContainer>
      <Sidebar setActive={setActive} />
      <div className="outlet">
        <Backdrop active={active}>
          <Modal
            // onReply={false}
            active={active}
            setActive={setActive}
            personalInfo={personalInfo}
          />
        </Backdrop>
        <Outlet />
      </div>
      {!onSettingPage && <PopularUserList />}
    </StyledLayoutContainer>
  );
};

export default Layout;
