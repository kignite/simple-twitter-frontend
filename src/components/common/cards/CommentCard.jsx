import React from "react";
import { Link } from "react-router-dom";
// import styled from "styled-components";
import { StyledCardContainer } from "./TweetCard";

const CommentCard = ({
  avatar,
  name,
  account,
  createdAt,
  replyTo,
  comment,
  userId,
}) => {
  return (
    <StyledCardContainer comment={true}>
      <Link to={`/user/other/?id=${userId}`}>
        <img src={avatar} alt={name} />
      </Link>
      <div className="right-side">
        <Link className="name-link" to={`/user/other/?id=${userId}`}>
          <span className="name">{name}</span>
        </Link>
        <span className="account">@{account}</span>
        <span className="created-time"> · {createdAt}</span>
        <p className="reply-to">
          回覆 <span>@{replyTo}</span>
        </p>
        <p>{comment}</p>
      </div>
    </StyledCardContainer>
  );
};

export default CommentCard;
