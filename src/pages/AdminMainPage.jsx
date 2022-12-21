import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import {
  adminDeleteUserTweet,
  adminGetUserTweets,
} from "../api/getAdminRelated";
import AdminSidebar from "../components/AdminSidebar";
import UserTweetCard from "../components/common/cards/UserTweetCard";
import { useAuth } from "../contexts/AuthContext";
// import jwt from "jwt-decode";

export const PageStyled = styled.div`
  position: relative;
  width: 1140px;
  height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 7fr;
  main {
    border-left: 1px solid var(--border_gray);
    border-right: 1px solid var(--border_gray);
    position: relative;
    overflow: scroll;
    header {
      position: sticky; //還沒資料看不出效果
      top: 0;
      z-index: 99;
      background-color: var(--main_white);
    }
    .title {
      border: 1px solid var(--border_gray);
      box-sizing: border-box;
      height: 74px;
      padding: 24px 20px;
    }
    //AdminTweets
    .tweets-list {
      border: 1px solid var(--border_gray);
    }
    //AdminUsers
    .users-list {
      border: 1px solid var(--border_gray);
      padding: 16px 15px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 16px 16px;
    }
  }
`;

const AdminMainPage = () => {
  const [tweetsData, setTweetsData] = useState([]);
  const { isAuthenticated, currentMember } = useAuth();
  const token = localStorage.getItem("token") || null;

  const handleDelete = async (e) => {
    // 型別轉為數字
    const tweetId = parseInt(e.target.dataset.id);
    await adminDeleteUserTweet({ tweetId, token });
    setTweetsData((prev) => prev.filter((tweet) => tweet.id !== tweetId));
  };
  useEffect(() => {
    const getTweetsData = async () => {
      const { data } = await adminGetUserTweets({ token });
      setTweetsData(data);
    };
    if (!isAuthenticated || currentMember.role !== "admin") return;

    getTweetsData();
  }, [isAuthenticated]);

  return (
    <PageStyled>
      <AdminSidebar />
      <main>
        <header>
          <h4 className="title">推文清單</h4>
        </header>
        <div className="tweets-list">
          {tweetsData.map((tweet) => (
            <UserTweetCard
              key={tweet.id}
              avatar={tweet.User.avatar}
              name={tweet.User.name}
              account={tweet.User.account}
              createdAt={tweet.createdAt}
              id={tweet.id}
              onDelete={handleDelete}
              description={tweet.description}
            />
          ))}
        </div>
      </main>
    </PageStyled>
  );
};
export default AdminMainPage;
