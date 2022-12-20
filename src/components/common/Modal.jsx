import React, { useRef } from "react";
import styled from "styled-components";
import { postReply, postTweet } from "../../api/getUserTweets";
import { CloseIcon } from "../../assets/icons";
import { StyledTextareaContainer } from "../../pages/HomePage";
import { StyledButton } from "./button.styled";
import { StyledCardContainer } from "./cards/TweetCard";

const StyledModalContainer = styled.div`
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(calc(-50% - 37px));
  margin: 0;
  width: 634px;
  opacity: initial;

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
  margin-top: 16px;
  top: 50px; //資料內容還沒塞沒撐出高度看不出來
  bottom: -10px;

  background-color: var(--reply-connect-line);
`;

const Modal = ({
  tweetId,
  active,
  setActive,
  personalInfo,
  onReply,
  avatar,
  name,
  account,
  createdAt,
  description,
}) => {
  const token = localStorage.getItem("token");
  const tweetRef = useRef(null);

  const handleTweet = async () => {
    console.log("tweet");
    if (tweetRef.current.value.length === 0) {
      setActive(false);
      return;
    }
    const tweet = { description: tweetRef.current.value };

    const status = await postTweet({ token, tweet });
    console.log(status);
    tweetRef.current.value = "";
    setActive(false);
  };

  const handleReply = async () => {
    console.log("reply");

    if (tweetRef.current.value.length === 0) {
      setActive(false);
      return;
    }
    const reply = { comment: tweetRef.current.value };
    console.log(reply);

    const status = await postReply({ token, tweetId, reply });
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
            <img src={avatar} alt={name} />
            <StyledConnectLine />
          </div>
          <div className="right-side">
            <span className="name">{name}</span>
            <span className="account">@{account}</span>
            <span className="created-time"> · {createdAt}</span>
            <p>{description}</p>
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
        <StyledButton
          className="post-tweet active"
          onClick={onReply ? handleReply : handleTweet}
        >
          {onReply ? "回覆" : "推文"}
        </StyledButton>
        {/* <button onClick={handlePost}>123</button> */}
      </StyledTextareaContainer>
    </StyledModalContainer>
  ) : null;
};

export default Modal;
