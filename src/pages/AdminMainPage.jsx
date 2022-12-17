import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { adminDeleteUserTweet, adminGetUserTweets } from "../api/getAdminRelated";
import { adminDeleteUserTweet, adminGetUserTweets } from "../api/getUserTweets";
import AdminSidebar from "../components/AdminSidebar";
// import jwt from "jwt-decode";

const PageStyled = styled.div`
  width: 1140px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 6fr;

  .title {
    border: 1px solid var(--border_gray);
    box-sizing: border-box;
    height: 74px;
    padding: 24px 20px;
    font-weight: 700;
    font-size: 24px;
  }

  .tweets-list {
    border: 1px solid var(--border_gray);
    height: 1126px;
    overflow-y: scroll;
  }
  .main {
    /* height: 100vh; */
    padding-right: 130px;
  }
`;

const TweetStyled = styled.div`
  .tweet-card {
    display: flex;
    width: 100%;
    margin: 16px 0;
  }
  .avatar {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 8px;
    margin-left: 24px;
  }
  .tweet-head {
    display: flex;
    justify-content: space-between;
    padding: 0 5px 8px 8px;
  }
  .tweet-content {
    padding: 0 30px 0 8px;
  }
`;
const AdminMainPage = () => {
  const [tweetsData, setTweetsData] = useState([]);
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

    getTweetsData();
  }, []);

  return (
    <PageStyled>
      <AdminSidebar />
      <div className="main">
        <h3 className="title">推文清單</h3>
        <div className="tweets-list">
          <TweetStyled>
            {tweetsData.map((tweet) => (
              <div className="tweet-card" key={tweet.id}>
                <img
                  width="50"
                  src={tweet.User.avatar}
                  alt="XX"
                  className="avatar"
                />
                <div className="tweet-text">
                  <div className="tweet-head">
                    <div className="tweet-user-info">
                      <span className="tweet-user-name">{tweet.User.name}</span>
                      <span className="tweet-user-account">
                        @{tweet.User.account} . {tweet.createdAt}
                      </span>
                    </div>
                    {/* 位置怪怪的 */}
                    <div
                      className="delete-tweet"
                      data-id={tweet.id}
                      onClick={handleDelete}
                    >
                      X
                    </div>
                  </div>
                  <p className="tweet-content">{tweet.description}</p>
                </div>
              </div>
            ))}
          </TweetStyled>
        </div>
      </div>
    </PageStyled>
  );
};
export default AdminMainPage;
