import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserInfo } from "../api/getUserTweets";
import Backdrop from "../components/Backdrop";
import EditInfoModal from "../components/profile/EditInfoModal";
import UserPanel from "../components/profile/UserPanel";

const UserPageStyle = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: 640px;
  border: 1px solid;
  display: grid;
  grid-template-rows: 74px 410px 678px;
  overflow: scroll;
`;

const UserInfoPicture = styled.div`
  position: relative;
  .cover {
    border: 2px solid black;
  }
  .avatar {
    box-sizing: border-box;
    position: absolute;
    bottom: -25%;
    left: 10px;
    border-radius: 50%;
    border: 5px solid white;
  }
  .edit {
    position: relative;
    bottom: -25%;
    right: 10px;
  }
`;

const UserInfoText = styled.div`
  width: 100%;
  margin-top: 72px;
`;

const UserPage = () => {
  const [active, setActive] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    id: 14,
    account: "user1",
    name: "12345",
    avatar: "https://i.imgur.com/fY0rZrF.png",
    cover: "https://i.imgur.com/f3xdCiw.png",
    introduction: "廢文製造機",
    role: "user",
    followerCount: 2,
    followingCount: 2,
  });
  const id = 14;
  const token = localStorage.getItem("token");

  const handleOpen = () => {
    setActive(true);
    console.log("編輯個人資料");
    console.log(personalInfo.name);
  };

  useEffect(() => {
    const getPersonalInfo = async () => {
      const data = await getUserInfo({ id, token });
      setPersonalInfo(data);
    };
    getPersonalInfo();
  }, []);

  return (
    <>
      <Backdrop active={active} setActive={setActive} />
      <UserPageStyle>
        <div className="user-name">{personalInfo.name}</div>
        <div className="user-info-container">
          <UserInfoPicture>
            <div className="image-area">
              <img
                src="https://picsum.photos/seed/picsum/800/200"
                alt=""
                className="cover"
              />
              <img
                src="https://picsum.photos/id/237/140/140"
                alt=""
                className="avatar"
              />
            </div>
            <EditInfoModal
              active={active}
              setActive={setActive}
              name={personalInfo.name}
              introduction={personalInfo.introduction}
            />
            <button className="edit" onClick={handleOpen}>
              編輯個人資料
            </button>
          </UserInfoPicture>
          <UserInfoText>
            <div className="name">John Dee</div>
            <div className="at">@heyjohn</div>
            <p className="introuduction">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos,
              eveniet.
            </p>
          </UserInfoText>
        </div>
        <UserPanel />
      </UserPageStyle>
    </>
  );
};
export default UserPage;
