import React, { useState } from "react";
// import styled from "styled-components";
import { useEffect } from "react";
import { adminGetUsersData } from "../api/getAdminRelated";
import UserInfoCard from "../components/common/cards/UserInfoCard";
import AdminSidebar from "../components/AdminSidebar";
import { PageStyled } from "./AdminMainPage";

// import jwt from "jwt-decode";

const AdminUserList = () => {
  const [usersData, setUsersData] = useState([]);
  const token = localStorage.getItem("token") || null;

  useEffect(() => {
    const getTweetsData = async () => {
      const { data } = await adminGetUsersData({ token });
      setUsersData(data);
    };
    getTweetsData();
  }, []);

  return (
    <PageStyled>
      <AdminSidebar />
      <main>
        <header>
          <h4 className="title">使用者列表</h4>
        </header>
        <div className="users-list">
          {usersData.map((user) => (
            <UserInfoCard
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
      </main>
    </PageStyled>
  );
};
export default AdminUserList;
