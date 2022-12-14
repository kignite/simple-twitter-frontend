import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { adminDeleteUserTweet, adminGetUserTweets } from "../api/getUserTweets";
// import jwt from "jwt-decode";

const PageStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1080px;

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

const AdminUserList = () => {
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
    await adminDeleteUserTweet({ tweetId, token });
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
        <h3 className="title">使用者清單</h3>
      </div>
    </PageStyled>
  );
};
export default AdminUserList;
