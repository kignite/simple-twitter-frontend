import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { adminGetUsersData } from "../api/getUserTweets";
import UserCard from "../components/common/cards/UserCard";
// import jwt from "jwt-decode";

const PageStyled = styled.div`
  display: grid;
  grid-template-columns: 332px 1fr;

  .sidebar {
    width: 332px;
  }

  .title {
    box-sizing: border-box;
    height: 74px;
    margin: 0 20px;
    padding: 24px 0;
    font-weight: 700;
    font-size: 24px;
  }

  .users-list {
    border: solid 1px;
    max-height: 1126px;
    overflow-y: scroll;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    /* grid-template-columns: repeat(4, 1fr); */
    grid-gap: 16px 8px;
  }
  .main {
    /* max-height: 1200px; */
  }
`;

const AdminUserList = () => {
  const [usersData, setUsersData] = useState([]);
  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    const getTweetsData = async () => {
      // const token = localStorage.getItem("token") || null;
      const { data } = await adminGetUsersData({ token });
      setUsersData(data);
    };
    getTweetsData();
  }, []);

  return (
    <PageStyled>
      <div className="sidebar">
        sidebar
        <button>測試用</button>
      </div>
      <div className="main">
        <h3 className="title">使用者清單</h3>
        <div className="users-list">
          {usersData.map((user) => (
            <UserCard
              key={user.id}
              cover={user.cover}
              avatar={user.avatar}
              name={user.name}
              account={user.account}
              tweetCount={user.tweetCount}
              likeCount={user.likeCount}
              followingCount={user.followingCount}
              followerCount={user.followerCount}
            />
          ))}
        </div>
      </div>
    </PageStyled>
  );
};
export default AdminUserList;
