import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import { StyledTabbar } from "../components/common/tab.styled";
import UserIntroCard from "../components/UserIntroCard";
import { TurnbackIcon } from "../assets/icons";
import { useNavigate } from "react-router-dom";

const FollowPageStyle = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  border: 1px solid var(--border_gray);
  header {
    display: flex;
    align-items: center;
    height: 74px;
    padding-left: 24px;
    border-bottom: 1px solid var(--border_gray);
    position: sticky; //還沒資料看不出效果
    top: 0;
  }
  .return {
    cursor: pointer;
  }
  .header-info {
    margin-left: 19px;
    .tweet-amount {
      font-size: 13px;
      font-weight: 500;
      line-height: 18.82px;
      color: var(--main_secondary);
    }
  }
  
`;

const FollowPage = ({pageStatus}) => {
  const navigate = useNavigate();

  return (
    <FollowPageStyle>
      <header>
        <TurnbackIcon className="return" />
        <div className="header-info">
          <h5>Jhon Doe</h5>
          <p className="tweet-amount">25 推文</p>
        </div>
      </header>
      <StyledTabbar>
        <button
          className={
            "user-action-tab" + clsx(" ", { active: pageStatus === "follower" })
          }
          onClick={() => {
            navigate('/user/self/follower');
          }}
        >
          追隨者
        </button>
        <button
          className={
            "user-action-tab" + clsx(" ", { active: pageStatus === "following" })
          }
          onClick={() => {
            navigate('/user/self/following');
          }}
        >
          正在追隨
        </button>
      </StyledTabbar>
      <div className="follow-list">
        <UserIntroCard />
      </div>
    </FollowPageStyle>
  );
};

export default FollowPage;
