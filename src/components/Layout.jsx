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
  const token = localStorage.getItem("token") || null;
  const [active, setActive] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({});
  const navigate = useNavigate();

  const { isAuthenticated, currentMember } = useAuth();

  useEffect(() => {
    const getdata = async () => {
      if (isAuthenticated && currentMember.role === "admin") {
        navigate("/admin_main");
        return;
      }
      const id = jwtDecode(token).id;
      const data = await getUserInfo({ token, id });
      if (data) {
        setPersonalInfo(data);
      } else {
        navigate("/login");
        return;
      }
    };
    if (!isAuthenticated || currentMember.role === "admin") {
      return;
    }

    getdata();
  }, [navigate, isAuthenticated]);

  return (
    <StyledLayoutContainer>
      <Sidebar setActive={setActive} />
      <div className="outlet">
        <Backdrop active={active} setActive={setActive}>
          <Modal
            active={active}
            setActive={setActive}
            personalInfo={personalInfo}
          />
        </Backdrop>
        <Outlet />
      </div>
      <PopularUserList />
    </StyledLayoutContainer>
  );
};

export default Layout;
