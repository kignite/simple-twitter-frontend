import React, { useEffect,useState } from "react";
import styled from "styled-components";
import { getTopFollwer } from "../../api/followshipAPI";
import { getUserFollowing } from "../../api/getUserTweets";
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
  const [topFollower, setTopFollower] = useState([]);
  const [followings, setFollowings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      const { data } = await getTopFollwer({ token });
      setTopFollower(data);
    };
    //取得使用者正在追隨名單去顯示Top10使用者的button樣式
    const getFollowings = async () => {
      const { data } = await getUserFollowing({ token });
      setFollowings([...data]);
    };
    getData();
    getFollowings();
  }, []);
  return (
    <StyledListContainer>
      <h4>推薦追隨</h4>
      <ul>
        {topFollower.map((top) => (
          <PopularUserCard
            key={top.id}
            avatar={top.avatar}
            name={top.name}
            account={top.account}
            isFollowed={followings.find(following => following.followingId === top.id)}
          />
        ))}
      </ul>
    </StyledListContainer>
  );
};

export default PopularUserList;
