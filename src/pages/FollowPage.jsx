import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import clsx from "clsx";
import { StyledTabbar } from "../components/common/tab.styled";
import UserIntroCard from "../components/UserIntroCard";
import { TurnbackIcon } from "../assets/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getUserInfo,
  getUserFollower,
  getUserFollowing,
} from "../api/getUserTweets";
import { postFollowed, deleteFollowed } from "../api/followshipAPI";
import jwtDecode from "jwt-decode";
import { useAuth } from "../contexts/AuthContext";
import { ClickingContext } from "../App";

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

const FollowPage = ({ pageStatus }) => {
  const [personalInfo, setPersonalInfo] = useState({});
  const [followData, setFollowData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || null;
  const [searchParams] = useSearchParams();
  const { isAuthenticated, currentMember } = useAuth();
  const { clicking, setClicking } = useContext(ClickingContext);

  let id;

  if (searchParams.get("id")) {
    id = searchParams.get("id");
  } else {
    id = jwtDecode(token).id;
  }

  //追隨某使用者
  const handleFollowed = async (userId) => {
    try {
      const status = await postFollowed({ userId, token });
      if (status === 200) {
        // const { data } = await getUserFollowing({ token });
        setClicking(!clicking);
        setFollowData((prevData) => {
          return prevData.map((prev) => {
            if (prev.followerId === userId) {
              return {
                ...prev,
                Followers: {
                  ...prev.Followers,
                  isFollowed: 1,
                },
              };
            }
            return prev;
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  //取消追隨某位使用者
  const handleUnFollowed = async (followingId) => {
    try {
      const status = await deleteFollowed({ followingId, token });
      if (status === 200) {
        // const { data } = await getUserFollowing({ token });
        setClicking(!clicking);
        setFollowData((prevData) => {
          if (pageStatus === "following") {
            return prevData.filter((prev) => prev.followingId !== followingId);
          }
          if (pageStatus === "follower") {
            return prevData.map((prev) => {
              if (prev.followerId === followingId) {
                return {
                  ...prev,
                  Followers: {
                    ...prev.Followers,
                    isFollowed: 0,
                  },
                };
              }
              return prev;
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const data = await getUserInfo({ token, id });
      setPersonalInfo(data);
    };
    let ignore = false;
    const getFollowData = async () => {
      if (pageStatus === "follower") {
        const { data } = await getUserFollower({ token, id });
        if (!ignore) {
          setFollowData([...data]);
        }
      }
      if (pageStatus === "following") {
        const { data } = await getUserFollowing({ token, id });
        if (!ignore) {
          setFollowData([...data]);
        }
      }
    };
    if (!isAuthenticated || currentMember.role !== "user") return;
    if (searchParams.get("id")) {
      id = searchParams.get("id");
    } else {
      id = jwtDecode(token).id;
    }

    getCurrentUser();
    getFollowData();

    return () => {
      ignore = true;
    };
  }, [pageStatus, isAuthenticated, clicking]);

  return (
    <FollowPageStyle>
      <header>
        <TurnbackIcon
          className="return"
          onClick={() => {
            navigate("/layout/user/self");
          }}
        />
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
            if (pageStatus !== "follower") {
              setFollowData([]);
            }
            navigate("/layout/user/self/follower");
          }}
        >
          追隨者
        </button>
        <button
          className={
            "user-action-tab" +
            clsx(" ", { active: pageStatus === "following" })
          }
          onClick={() => {
            if (pageStatus !== "following") {
              setFollowData([]);
            }
            navigate("/layout/user/self/following");
          }}
        >
          正在追隨
        </button>
      </StyledTabbar>
      <div className="follow-list">
        {followData.map((item) => {
          if (pageStatus === "follower") {
            return (
              <UserIntroCard
                key={item.followerId}
                userId={item.followerId}
                avatar={item.Followers.avatar}
                name={item.Followers.name}
                introduction={item.Followers.introduction}
                isFollowed={item.Followers.isFollowed}
                onBtnClicked={() => {
                  if (item.Followers.isFollowed) {
                    handleUnFollowed(item.followerId);
                  } else {
                    handleFollowed(item.followerId);
                  }
                }}
              />
            );
          }
          if (pageStatus === "following") {
            return (
              <UserIntroCard
                key={item.followingId}
                userId={item.followingId}
                avatar={item.Followings.avatar}
                name={item.Followings.name}
                introduction={item.Followings.introduction}
                isFollowed={item.Followings.isFollowed}
                onBtnClicked={() => {
                  handleUnFollowed(item.followingId);
                }}
              />
            );
          }
        })}
      </div>
    </FollowPageStyle>
  );
};

export default FollowPage;
