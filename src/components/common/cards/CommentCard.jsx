import React from "react";
// import styled from "styled-components";
import { StyledCardContainer } from "./TweetCard";

const CommentCard = ({
  avatar,
  name,
  account,
  createdAt,
  replyTo,
  description,
}) => {
  return (
    <StyledCardContainer>
    <img src={avatar} alt={name} />
    <div className="right-side">
      <span className="name">{name}</span>
      <span className="account">@{account}</span>
      <span className="created-time"> · {createdAt}</span>
      <p className="reply-to">回覆 <span>@{replyTo}</span></p>
      <p>{description}</p>
    </div>
  </StyledCardContainer>
  );
};

export default CommentCard;
