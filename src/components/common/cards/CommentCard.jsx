import React from "react";
// import styled from "styled-components";
import { StyledCardContainer } from "./TweetCard";

const CommentCard = ({
  avatar,
  name,
  account,
  createdAt,
  replyTo,
  comment,
}) => {
  return (
    <StyledCardContainer comment={true}>
    <img src={avatar} alt={name} />
    <div className="right-side">
      <span className="name">{name}</span>
      <span className="account">@{account}</span>
      <span className="created-time"> · {createdAt}</span>
      <p className="reply-to">回覆 <span>@{replyTo}</span></p>
      <p>{comment}</p>
    </div>
  </StyledCardContainer>
  );
};

export default CommentCard;
