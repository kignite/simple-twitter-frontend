import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { adminGetUsersData } from "../api/getUserTweets";
import UserCard from "../components/common/cards/UserCard";
import AdminSidebar from "../components/AdminSidebar";
// import jwt from "jwt-decode";

const PageStyled = styled.div`
  margin: 0 auto;
  width: 1140px;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 6fr;

  .title {
    box-sizing: border-box;
    height: 74px;
    margin: 0 20px;
    padding: 24px 0;
    font-weight: 700;
    font-size: 24px;
  }

  .users-list {
    border-top: 1px solid var(--border_gray);
    max-height: 1126px;
    overflow-y: scroll;
    padding: 16px 15px;
    display: grid;
    /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 16px 16px;
  }
  .main {
    border-left: 1px solid var(--border_gray);
    height: 100vh;
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
      <AdminSidebar />
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
