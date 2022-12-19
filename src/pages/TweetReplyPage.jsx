import React from "react";
import styled from "styled-components";
import TweetCardBig from "../components/common/cards/TweetCardBig";
import CommentCard from "../components/common/cards/CommentCard";
import { TurnbackIcon } from "../assets/icons";

const TweetReplyPageStyle = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  border: 1px solid var(--border_gray);
  overflow-y: scroll;
  overflow-x: hidden;
  header {
    display: flex;
    align-items: center;
    height: 74px;
    padding-left: 24px;
    border-bottom: 1px solid var(--border_gray);
    background-color: var(--main_white);
    position: sticky; //還沒資料看不出效果
    top: 0;
  }
  h4 {
    margin-left: 19px;
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
    color: var(--main_text);
  }

  .return {
    cursor: pointer;
  }
`;

const TweetReplyPage = () => {
  return (
    <TweetReplyPageStyle>
      <header>
        <TurnbackIcon className="return" />
        <h4>推文</h4>
      </header>
      <TweetCardBig />
      <CommentCard />
    </TweetReplyPageStyle>
  );
};

export default TweetReplyPage;