import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserInfo } from "../api/getUserTweets";
import Backdrop from "../components/Backdrop";
import EditInfoModal from "../components/profile/EditInfoModal";
import UserPanel from "../components/profile/UserPanel";

const UserPageStyle = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  border: 1px solid var(--border_gray);
  display: grid;
  grid-template-rows: 74px 410px 678px;
  overflow: scroll;
  header {
    border-bottom: 1px solid var(--border_gray);
    position: sticky;
    top: 0;

    background-color: var(--main_white);
    z-index: 99;
  }
  h5 {
    margin: 24px;
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
    color: var(--main_text);
  }
`;

const UserInfoPicture = styled.div`
  position: relative;
  .cover {
    width: 100%;
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
  const id = 14;
  const token = localStorage.getItem("token");
  const [personalInfo, setPersonalInfo] = useState({
    id: 14,
    account: "",
    name: "",
    avatar: "https://i.imgur.com/fY0rZrF.png",
    cover: "https://i.imgur.com/f3xdCiw.png",
    introduction: "",
    role: "user",
    followerCount: 2,
    followingCount: 2,
  });

  const handleOpen = () => {
    setActive(true);
    console.log("編輯個人資料");
  };

  useEffect(() => {
    const getPersonalInfo = async () => {
      const data = await getUserInfo({ id, token });
      setPersonalInfo(data);
      console.log(data);
    };
    getPersonalInfo();
  }, [active]);

  return (
    <>
      <Backdrop active={active} setActive={setActive} />
      <UserPageStyle>
        <header>
          <h5 className="user-name">{personalInfo.name}</h5>
        </header>
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
            {active ? (
              <EditInfoModal
                active={active}
                setActive={setActive}
                id={id}
                token={token}
                name={personalInfo.name}
                avata={personalInfo.avatar}
                cover={personalInfo.cover}
                introduction={personalInfo.introduction}
              />
            ) : null}
            <button className="edit" onClick={handleOpen}>
              編輯個人資料
            </button>
          </UserInfoPicture>
          <UserInfoText>
            <div className="name">{personalInfo.name}</div>
            <div className="at">@{personalInfo.account}</div>
            <p className="introuduction">{personalInfo.introduction}</p>
          </UserInfoText>
        </div>
        <UserPanel personalInfo={personalInfo} />
      </UserPageStyle>
    </>
  );
};
export default UserPage;
