import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserInfo } from "../api/getUserTweets";
import Backdrop from "../components/Backdrop";
import EditInfoModal from "../components/profile/EditInfoModal";
import UserPanel from "../components/profile/UserPanel";
import { TurnbackIcon } from "../assets/icons";
import { StyledButton } from "../components/common/button.styled";

const UserPageStyle = styled.div`
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  border: 1px solid var(--border_gray);
  overflow: scroll;
  header {
    display: flex;
    align-items: center;
    height: 74px;
    padding-left: 24px;
    border-bottom: 1px solid var(--border_gray);
    position: sticky;
    top: 0;

    background-color: var(--main_white);
    z-index: 99;
  }
  .header-info {
    margin-left: 19px;
    h5 {
      font-size: 18px;
      font-weight: 700;
      line-height: 26px;
      color: var(--main_text);
    }
    .tweet-amount {
      font-size: 13px;
      font-weight: 500;
      line-height: 18.82px;
      color: var(--main_secondary);
    }
  }
`;

const UserInfoPicture = styled.div`
  position: relative;
  .cover {
    width: 100%;
    height: 200px;
  }
  .avatar {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 16px;
    transform: translateY(50%);
    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 5px solid white;
  }
  .edit {
    position: absolute;
    bottom: 0;
    right: 16px;
    transform: translateY(calc(100% + 16px));
  }
`;

const UserInfoText = styled.div`
  width: 100%;
  margin-top: 72px;
  padding: 16px;
  /* .name {
    color: 
  } */
  .account,
  .introduction {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    margin-bottom: 6px;
  }
  .account {
    color: var(--account_text-in-main);
  }
  .follow-info {
    display: flex;
    align-items: center;
    margin-top: 8px;
    p {
      margin-right: 20px;

      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      span {
        color: var(--main_secondary);
        cursor: pointer;
      }
    }
  }
`;

const UserPage = () => {
  const [active, setActive] = useState(false);
  const token = localStorage.getItem("token");
  const [personalInfo, setPersonalInfo] = useState({});
  const [tmpName, setTmpName] = useState("");

  const handleOpen = () => {
    setActive(true);
    console.log("編輯個人資料");
  };
  const handleClose = () => {
    setActive(false);
  };

  useEffect(() => {
    const getPersonalInfo = async () => {
      const data = await getUserInfo({ token });
      setPersonalInfo(data);
      setTmpName(data.name);
    };
    getPersonalInfo();
  }, [active]);

  return (
    <>
      <Backdrop active={active} onClose={handleClose} />
      <UserPageStyle>
        <header>
          <TurnbackIcon className="return" />
          <div className="header-info">
            {active ? <h5>{tmpName}</h5> : <h5>{personalInfo.name}</h5>}
            {/* 請後端添加推文數量 */}
            <p className="tweet-amount">25 推文</p>
          </div>
        </header>
        <div className="user-info-container">
          <UserInfoPicture>
            <div className="image-area">
              <img src={personalInfo.cover} alt="" className="cover" />
              <img src={personalInfo.avatar} alt="" className="avatar" />
            </div>
            {active ? (
              <EditInfoModal
                token={token}
                personalInfo={personalInfo}
                setPersonalInfo={setPersonalInfo}
                onClose={handleClose}
              />
            ) : null}
            <StyledButton className="edit" onClick={handleOpen}>
              編輯個人資料
            </StyledButton>
          </UserInfoPicture>
          <UserInfoText>
            <h5 className="name">{personalInfo.name}</h5>
            <div className="account">@{personalInfo.account}</div>
            <p className="introuduction">{personalInfo.introduction}</p>
            <div className="follow-info">
              <p>
                {personalInfo.followingCount}
                <span> 跟隨中</span>
              </p>
              <p>
                {personalInfo.followerCount}
                <span> 跟隨者</span>
              </p>
            </div>
          </UserInfoText>
        </div>
        <UserPanel personalInfo={personalInfo} />
      </UserPageStyle>
    </>
  );
};
export default UserPage;
