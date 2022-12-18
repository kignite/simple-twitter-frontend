import React, { useRef } from "react";
import styled from "styled-components";
import { postTweet } from "../../api/getUserTweets";
import { CloseIcon } from "../../assets/icons";
import { StyledTextareaContainer } from "../../pages/HomePage";
import { StyledButton } from "./button.styled";
import { StyledCardContainer } from "./cards/TweetCard";

const StyledModalContainer = styled.div`
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  width: 634px;

  border-radius: 14px;
  background-color: var(--main_white);
  z-index: 200;

  .modal-header {
    border-bottom: 1px solid var(--border_gray);
    height: unset;
    padding: unset;
    .close {
      margin: 20px;
      cursor: pointer;
    }
  }
`;

const StyledConnectLine = styled.div`
  position: absolute;
  width: 2px;
  margin-left: 49px;
  top: 50px; //資料內容還沒塞沒撐出高度看不出來
  bottom: 0;

  background-color: var(--reply-connect-line);
`;

const Modal = ({ active, setActive, personalInfo ,onReply }) => {
  const token = localStorage.getItem("token");
  const tweetRef = useRef(null);

  const handlePost = async () => {
    if (tweetRef.current.value.length === 0) {
      setActive(false);
      return;
    }
    const tweet = { description: tweetRef.current.value };

    const status = await postTweet({ token, tweet });
    console.log(status);
    setActive(false);
  };

  return active ? (
    <StyledModalContainer>
      <div className="modal-header">
        <CloseIcon className="close" onClick={() => setActive(false)} />
      </div>
      {onReply && (
        <StyledCardContainer modal={true}>
          <div className="left-side">
            <img src={personalInfo.avatar} alt={personalInfo.name} />
            <StyledConnectLine />
          </div>
          <div className="right-side">
            <span className="name">{personalInfo.name}</span>
            <span className="account">@{personalInfo.account}</span>
            <span className="created-time"> · {personalInfo.createdAt}</span>
            <p>{personalInfo.description}</p>
          </div>
        </StyledCardContainer>
      )}
      <StyledTextareaContainer modal={true}>
        <img src={personalInfo.avatar} alt="你的頭像" />
        <textarea
          name=""
          id=""
          cols="50"
          rows="5"
          placeholder={onReply ? "推你的回覆" : "有什麼新鮮事?"}
          ref={tweetRef}
        ></textarea>
        <StyledButton className="post-tweet active" onClick={handlePost}>
          {onReply ? "回覆" : "推文"}
        </StyledButton>
        {/* <button onClick={handlePost}>123</button> */}
      </StyledTextareaContainer>
    </StyledModalContainer>
  ) : null;
};

export default Modal;
