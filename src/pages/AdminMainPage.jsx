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
      background-color: var(--main_white);
      z-index: 5;
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
      padding: 16px 0px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 16px 16px;
    }
  }
`;

const AdminMainPage = () => {
  const [tweetsData, setTweetsData] = useState([]);
  const { isAuthenticated, currentMember } = useAuth();
  const [checkTweetId, setCheckTweetId] = useState(null);
  const token = localStorage.getItem("token") || null;
  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = async (tweetId) => {
    const token = localStorage.getItem("token");
    const {success} = await adminDeleteUserTweet({ tweetId, token });
    if(success)setIsDelete(true);
  };

  useEffect(() => {
    if(!checkTweetId)return
    let prev = [...tweetsData];
    setTweetsData(prev.filter((tweet) => tweet.id !== checkTweetId));
    setCheckTweetId(null);
    setIsDelete(false)
  }, [isDelete]);

  useEffect(() => {
    const getTweetsData = async () => {
      const { data } = await adminGetUserTweets({ token });
      setTweetsData(data);
    };

    if (!isAuthenticated || currentMember.role !== "admin") return;
    console.log("我在跟SERVER拿資料")
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
              tweetId={tweet.id}
              description={tweet.description}
              onDelete={handleDelete}
              checkTweetId={checkTweetId}
              setCheckTweetId={setCheckTweetId}
            />
          ))}
        </div>
      </main>
    </PageStyled>
  );
};
export default AdminMainPage;
