import React, { useEffect, useState } from "react";
import styled from "styled-components";
import clsx from "clsx";
import { StyledTabbar } from "../components/common/tab.styled";
import UserIntroCard from "../components/UserIntroCard";
import { TurnbackIcon } from "../assets/icons";
import { useNavigate } from "react-router-dom";
import { getUserInfo, getUserFollower, getUserFollowing } from "../api/getUserTweets";

const FollowPageStyle = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  border-left: 1px solid var(--border_gray);
  border-right: 1px solid var(--border_gray);
  overflow: scroll;
  header {
    display: flex;
    align-items: center;
    height: 74px;
    padding-left: 24px;
    border-bottom: 1px solid var(--border_gray);
    background-color: var(--main_white);
    position: sticky; //還沒資料看不出效果
    top: 0;
  }
  .return {
    cursor: pointer;
  }
  .header-info {
    margin-left: 19px;
    .tweet-amount {
      font-size: 13px;
      font-weight: 500;
      line-height: 18.82px;
      color: var(--main_secondary);
    }
  }
  
`;

const FollowPage = ({pageStatus}) => {
  const [personalInfo, setPersonalInfo] = useState({});
  const [followData, setFollowData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  useEffect(() => {
    const getCurrentUser = async () => {
      const data = await getUserInfo({token});
      setPersonalInfo(data);
    };
    let ignore = false;
    const getFollowData = async () => {
      if (pageStatus === "follower") {
        const { data } = await getUserFollower({ token });
        console.log(data);
        if (!ignore) {
          setFollowData([...data]);
        }
      }
      if (pageStatus === "following") {
        const {data} = await getUserFollowing({token});
        console.log(data);
        if (!ignore) {
          setFollowData([...data]);
        }
      }
    };

    getCurrentUser();
    getFollowData();

    return () => {
      ignore = true;
    }

  }, [pageStatus])

  return (
    <FollowPageStyle>
      <header>
        <TurnbackIcon className="return" />
        <div className="header-info">
          <h5>{personalInfo.name}</h5>
          <p className="tweet-amount">{personalInfo.tweetCount} 推文</p>
        </div>
      </header>
      <StyledTabbar>
        <button
          className={
            "user-action-tab" + clsx(" ", { active: pageStatus === "follower" })
          }
          onClick={() => {
            setFollowData([]);
            navigate('/user/self/follower');
          }}
        >
          追隨者
        </button>
        <button
          className={
            "user-action-tab" + clsx(" ", { active: pageStatus === "following" })
          }
          onClick={() => {
            setFollowData([]);
            navigate('/user/self/following');
          }}
        >
          正在追隨
        </button>
      </StyledTabbar>
      <div className="follow-list">
        {followData.map(item => {
          if (pageStatus === "follower") {
            return <UserIntroCard
              key={item.followerId}
              avatar={item.Followers.avatar}
              name={item.Followers.name}
              introduction={item.Followers.introduction}
              isFollowed={item.Followers.isFollowed}
            />
          }
          if (pageStatus === "following") {
            return <UserIntroCard
              key={item.followingId}
              avatar={item.Followings.avatar}
              name={item.Followings.name}
              introduction={item.Followings.introduction}
              isFollowed={item.Followings.isFollowed}
            />
          }
         })}
      </div>
    </FollowPageStyle>
  );
};

export default FollowPage;
