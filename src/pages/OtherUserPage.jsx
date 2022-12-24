import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { getUserInfo } from "../api/getUserTweets";
// import Backdrop from "../components/Backdrop";
import UserPanel from "../components/profile/UserPanel";
import { TurnbackIcon, NotiIcon, MessageIcon } from "../assets/icons";
import { StyledButton } from "../components/common/button.styled";
import { useAuth } from "../contexts/AuthContext";
import { postFollowed, deleteFollowed } from "../api/followshipAPI";
import { getUserFollowing } from "../api/getUserTweets";
import clsx from "clsx";

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
    .return {
      cursor: pointer;
    }
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
  .tool-box {
    position: absolute;
    bottom: 0;
    right: 16px;
    transform: translateY(calc(100% + 16px));
    display: flex;

    * {
      margin: auto 8px;
    }

    .msg-icon,
    .noti-icon {
      display: flex;
      box-sizing: border-box;
      height: 40px;
      width: 40px;
      border-radius: 50px;
      border: 1px solid var(--main_orange);
    }
  }
`;

const UserInfoText = styled.div`
  width: 100%;
  margin-top: 72px;
  padding: 16px;

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
      a {
        text-decoration: none;
      }
      span {
        color: var(--main_secondary);
        cursor: pointer;
      }
    }
  }
`;

const OtherUserPage = () => {
  const token = localStorage.getItem("token");
  const [searchParams] = useSearchParams();
  const { key } = useLocation();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const { isAuthenticated, currentMember } = useAuth();

  const [personalInfo, setPersonalInfo] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);

  //追隨某使用者
  const handleFollowed = async (userId) => {
    try {
      const status = await postFollowed({ userId, token });
      console.log(status);
      if (status === 200) {
        setIsFollowed(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //取消追隨某位使用者
  const handleUnFollowed = async (followingId) => {
    try {
      const status = await deleteFollowed({ followingId, token });
      console.log(status);
      if (status === 200) {
        setIsFollowed(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getCurrentMemberFollowings = async () => {
      const { data } = await getUserFollowing({ token });
      if (data.some(d => d.followingId === Number(id))) {
        setIsFollowed(true);
        console.log(isFollowed);
      }
    };

    getCurrentMemberFollowings();
  }, [])

  useEffect(() => {
    const getPersonalInfo = async () => {
      // console.log(searchParams.get("id"));
      const data = await getUserInfo({ token, id });
      setPersonalInfo(data);
    };
    if (!isAuthenticated || currentMember.role !== "user") return;

    getPersonalInfo();
  }, [key, isAuthenticated]);

  return (
    <>
      <UserPageStyle>
        <header>
          <TurnbackIcon className="return" onClick={() => {
            navigate(-1);
          }} />
          <div className="header-info">
            <h5>{personalInfo.name}</h5>
            <p className="tweet-amount">{personalInfo.tweetCount} 推文</p>
          </div>
        </header>
        <div className="user-info-container">
          <UserInfoPicture>
            <div className="image-area">
              <img src={personalInfo.cover} alt="" className="cover" />
              <img src={personalInfo.avatar} alt="" className="avatar" />
            </div>
            <div className="tool-box">
              <div className="msg-icon">
                <MessageIcon />
              </div>
              <div className="noti-icon">
                <NotiIcon />
              </div>
              <StyledButton className={"follow-btn" + clsx(" ", { active: isFollowed })} onClick={() => {isFollowed ? handleUnFollowed(id) : handleFollowed(id)}}>
                {isFollowed ? "正在跟隨" : "跟隨"}
              </StyledButton>
            </div>
          </UserInfoPicture>
          <UserInfoText>
            <h5 className="name">{personalInfo.name}</h5>
            <div className="account">@{personalInfo.account}</div>
            <p className="introuduction">{personalInfo.introduction}</p>
            <div className="follow-info">
              <p>
                {personalInfo.followingCount}
                <Link to={`/layout/user/other/following?id=${id}`}>
                  <span> 跟隨中</span>
                </Link>
              </p>
              <p>
                {personalInfo.followerCount}
                <Link to={`/layout/user/other/follower?id=${id}`}>
                  <span> 跟隨者</span>
                </Link>
              </p>
            </div>
          </UserInfoText>
        </div>
        <UserPanel personalInfo={personalInfo} />
      </UserPageStyle>
    </>
  );
};
export default OtherUserPage;
