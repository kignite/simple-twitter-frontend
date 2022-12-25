import React, { useRef, useState } from "react";
import styled from "styled-components";
import { postReply, postTweet } from "../../api/getUserTweets";
import { CloseIcon } from "../../assets/icons";
import { StyledTextareaContainer } from "../../pages/HomePage";
import { StyledButton } from "./button.styled";
import { StyledCardContainer } from "./cards/TweetCard";
import { useNavigate } from "react-router-dom";

const StyledModalContainer = styled.div`
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(calc(-50% - 37px));
  margin: 0;
  width: 634px;
  opacity: initial;
  overflow: hidden;

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
  onPages,
  avatar,
  name,
  account,
  createdAt,
  description,
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const tweetRef = useRef(null);
  const [draft, setDraft] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  console.log(tweetId);
  console.log("replyTo:", name);

  const handleTweet = async () => {
    if (tweetRef.current.value.length === 0) {
      console.log("請輸入至少一個字");
      setErrorMsg("內容不可空白");
      return;
    }
    const tweet = { description: tweetRef.current.value };

    const status = await postTweet({ token, tweet });
    console.log(status);
    tweetRef.current.value = "";
    setActive(false);
  };

  const handleReply = async () => {
    if (tweetRef.current.value.length === 0) {
      console.log("請輸入至少一個字");
      setErrorMsg("內容不可空白");
      return;
    }
    const reply = { comment: tweetRef.current.value };
    const status = await postReply({ token, tweetId, reply });
    console.log(status);
    setActive(false);
    if (onPages) {
      navigate(-1);
    }
  };

  return active ? (
    <StyledModalContainer>
      <div className="modal-header">
        <CloseIcon className="close" onClick={() => {
          setActive(false);
          if (onPages) {
            navigate(-1);
          }
        }} />
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
            <span className="created-time"> · {Array.isArray(createdAt) ? `${createdAt[0]} ${createdAt[1]}` : createdAt}</span>
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
          value={draft}
          onChange={(e) => {
            setErrorMsg(null);
            setDraft(e.target.value);
          }}
        ></textarea>
        <div className="action-panel">
          <p className="error-msg">{
            draft.length > 140 ?
            "字數不可超過 140 字!"
            :
            ""
            }
            {errorMsg !== null && errorMsg}
          </p>
          <StyledButton
            className="post-tweet active"
            onClick={onReply ? handleReply : handleTweet}
          >
            {onReply ? "回覆" : "推文"}
          </StyledButton>
        </div>
      </StyledTextareaContainer>
    </StyledModalContainer>
  ) : null;
};

export default Modal;
