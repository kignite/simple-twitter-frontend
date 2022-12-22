import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getTopFollwer, postFollowed, deleteFollowed } from "../../api/followshipAPI";
import { getUserFollowing } from "../../api/getUserTweets";
import { useAuth } from "../../contexts/AuthContext";
import PopularUserCard from "./PopularUserCard";

const StyledListContainer = styled.div`
  grid-column: 3 / 4;
  align-self: flex-start;
  width: calc(100% - 25px);
  margin-left: 25px;
  border-radius: 16px;
  background-color: var(--scale_light-gray);

  h4 {
    padding: 24px;
    margin: 0;
    color: var(--main_text);
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
    border-bottom: 1px solid var(--border_gray);
  }
`;

const PopularUserList = () => {
  const [topFollowers, setTopFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const { isAuthenticated, currentMember } = useAuth();

  const token = localStorage.getItem("token");

  //追隨某使用者
  const handleFollowed = async (userId) => {
    try {
      const status = await postFollowed({userId, token});
      console.log(status);
      if (status === 200) {
        const { data } = await getUserFollowing({ token });
        setFollowings([...data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //取消追隨某位使用者
  const handleUnFollowed = async (followingId) => {
    try {
      const status = await deleteFollowed({followingId, token});
      console.log(status);
      if (status === 200) {
        const { data } = await getUserFollowing({ token });
        setFollowings([...data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await getTopFollwer({ token });
      setTopFollowers(data);
    };
    //取得使用者正在追隨名單去顯示Top10使用者的button樣式
    const getFollowings = async () => {
      const { data } = await getUserFollowing({ token, id });
      setFollowings([...data]);
    };

    if (!isAuthenticated || currentMember.role !== "user") return;
    const id = jwtDecode(token).id;
    getData();
    getFollowings();

  }, [isAuthenticated]);
  return (
    <StyledListContainer>
      <h4>推薦追隨</h4>
      <ul>
        {topFollowers.map((top) => (
          <PopularUserCard
            key={top.id}
            avatar={top.avatar}
            name={top.name}
            account={top.account}
            isFollowed={followings.find(
              (following) => following.followingId === top.id
            )}
            onBtnClicked={() => {
              if (followings.find((following) => following.followingId === top.id)) {
                handleUnFollowed(top.id);
              } else {
                handleFollowed(top.id);
              }
            }}
          />
        ))}
      </ul>
    </StyledListContainer>
  );
};

export default PopularUserList;
