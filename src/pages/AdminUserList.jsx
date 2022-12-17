import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { adminGetUsersData } from "../api/getAdminRelated";
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

const UserCardStyled = styled.div`
  .user-card {
    .img-area {
      position: relative;

      .avatar {
        box-sizing: border-box;
        border: 4px solid var(--main_white);
        height: 100px;
        width: 100px;
        border-radius: 50%;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
  }
`;

const AdminUserList = () => {
  // const holdOn = 1;
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
      <div>
        sidebar
        <button>測試用</button>
      </div>
      <div className="main">
        <h3 className="title">使用者清單</h3>
        <div className="users-list">
          <UserCardStyled>
            {usersData.map((user) => (
              <div className="user-card" key={user.id}>
                <div className="img-area">
                  <img
                    width="250px"
                    src={user.cover}
                    alt=""
                    className="cover"
                  />
                  <img
                    width="100px"
                    src={user.avatar}
                    alt=""
                    className="avatar"
                  />
                </div>
                <div className="text-area">
                  <div className="name-account">
                    <h4 className="name">{user.name}</h4>
                    <span className="account">{user.account}</span>
                  </div>
                  <div className="tweet-like">
                    <span className="tweet">口 {user.tweetCount}</span>
                    <span className="like"> v {user.replyCount}</span>
                  </div>
                  <div className="following-follower">
                    <span className="following">
                      {user.followingCount} 個跟隨中
                    </span>
                    <span className="follower">
                      {user.followerCount} 位跟隨者
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </UserCardStyled>
        </div>
      </div>
    </PageStyled>
  );
};
export default AdminUserList;
