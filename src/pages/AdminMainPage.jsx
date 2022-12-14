import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { adminDeletUserTweet, adminGetUserTweets } from "../api/getUserTweets";
// import jwt from "jwt-decode";

const PageStyled = styled.div`
  display: grid;
  grid-template-columns: 2fr 6fr 1fr;

  .title {
    box-sizing: border-box;
    height: 74px;
    margin: 0 20px;
    padding: 24px 0;
    font-weight: 700;
    font-size: 24px;
  }

  .tweets-list {
    border: solid 1px;
    max-height: 1126px;
    overflow-y: scroll;
  }
  .main {
    /* max-height: 1200px; */
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
  const [tweetsData, setTweetsData] = useState([
    {
      id: 14,
      UserId: 64,
      description: "Accusantium laborum laudantium nulla exercitatione",
      createdAt: "17 小時前",
      updatedAt: "2022-12-13T08:53:06.000Z",
      User: {
        id: 64,
        name: "user6",
        account: "user6",
        avatar: "https://loremflickr.com/320/240/man,woman/?random=73",
      },
    },
  ]);
  const token = localStorage.getItem("token") || null;

  const handleDelete = async (e) => {
    console.log(e.target.dataset.id);
    const tweetId = e.target.dataset.id;
    await adminDeletUserTweet({ tweetId, token });
  };
  useEffect(() => {
    const getTweetsData = async () => {
      // const token = localStorage.getItem("token") || null;
      const { data } = await adminGetUserTweets({ token });
      setTweetsData(data);
    };

    getTweetsData();
  }, [handleDelete]);

  return (
    <PageStyled>
      <div>
        sidebar
        <button>測試用{tweetsData[0].id}</button>
      </div>
      <div className="main">
        <h3 className="title">推文清單</h3>
        <div className="tweets-list">
          <TweetStyled>
            {tweetsData.map((tweet) => (
              <div className="tweet-card" key={tweet.id}>
                <img
                  width="50"
                  src={tweet.User.avatar}
                  alt=""
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
      <div>blank</div>
    </PageStyled>
  );
};
export default AdminMainPage;
