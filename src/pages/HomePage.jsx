import React from "react";
import styled from "styled-components";
import TweetCard from "../components/common/cards/TweetCard";
import { StyledButton } from "../components/common/button.styled";

const HomePageStyle = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  border: 1px solid var(--border_gray);
  header {
    border-bottom: 1px solid var(--border_gray);
    position: sticky; //還沒資料看不出效果
    top: 0;
  }
  h4 {
    margin: 24px;
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
    color: var(--main_text);
  }
  .devider {
    width: 100%;
    height: 10px;
    background-color: var(--border_gray);
  }
`;

export const StyledTextareaContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: ${props => (props.modal ? '243px' : '136px')};
  img {
    margin: 16px 25px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--border_gray);
  }
  textarea {
    resize: none;
    border: none;
    &[placeholder] {
      margin-top: 28px;
      margin-left: 8px;
      font-size: 18px;
      font-weight: ${props => (props.modal ? '400' : '700')};
      line-height: 26px;
      color: var(--textarea-placeholder);
    }
    outline: 0; 
    :focus {
      border: none;
    }
  }
  .post-tweet {
    position: absolute;
    bottom: 16px;
    right: 24px;
  }
`;

const HomePage = ({avatar}) => {
  return (
    <HomePageStyle>
      <header>
        <h4 className="home">首頁</h4>
      </header>
      <StyledTextareaContainer>
        <img src={avatar} alt="你的頭像" />
        <textarea name="" id="" cols="50" rows="5" placeholder="有什麼新鮮事?" ></textarea>
        <StyledButton className="post-tweet active">推文</StyledButton>
      </StyledTextareaContainer>
      <div className="devider"></div>
      <ul className="tweet-list">
        <TweetCard />
      </ul>
    </HomePageStyle>
  );
};
export default HomePage;
