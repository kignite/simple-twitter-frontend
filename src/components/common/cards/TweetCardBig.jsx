import React, { useState } from "react";
import styled from "styled-components";
import { ReplyIcon, LikeIcon, LikedIcon } from "../../../assets/icons";
import Backdrop from "../../Backdrop";
import Modal from "../Modal";

const StyledCardContainer = styled.div`
  width: 100%;
  padding: 16px;
  .user-info {
    display: flex;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--main_secondary);
    }
    .user {
      margin-left: 8px;
    }
    .name {
      font-size: 16px;
      font-weight: 700;
      line-height: 26px;
      margin-right: 8px;
      color: var(--main_text);
    }
  }
  .account,
  .created-time {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: var(--account_text-in-main);
  }
  .created-time {
    margin: 8px 0;
    font-weight: 500;
  }

  .description {
    margin-top: 10px;
    width: calc(100% - 32px);
    font-size: 24px;
    font-weight: 400;
    line-height: 36px;
  }
  .amount-footer {
    display: flex;
    padding: 16px 0;
    width: calc(100% - 32px);
    border-top: 1px solid var(--border_gray);
    border-bottom: 1px solid var(--border_gray);
    p {
      font-weight: 500;
      font-size: 19px;
      line-height: 27.51px;
      color: var(--account_text-in-main);
      &:nth-child(1) {
        margin-right: 24px;
      }
    }
    span {
      font-weight: 700;
      font-family: "Montserrat";
      color: var(--main_text);
    }
  }
  .icon-footer {
    padding-top: 22px;
  }
`;

const TweetCardBig = ({
  tweetId,
  avatar,
  name,
  account,
  description,
  createdAt,
  replyCount,
  likeCount,
  isLiked,
  personalInfo
}) => {
  const [active, setActive] = useState(false);

  const iconSize = {
    width: "25px",
    height: "25px",
    marginRight: "133px",
    cursor: "pointer", //加上點擊指標
  };

  return (
    <StyledCardContainer>
      <Backdrop active={active} setActive={setActive} />
      <Modal
        tweetId={tweetId}
        active={active}
        setActive={setActive}
        avatar={avatar}
        name={name}
        account={account}
        createdAt={createdAt}
        description={description}
        onReply={true}
        personalInfo={personalInfo}
      />
      <div className="user-info">
        <img src={avatar} alt={name} />
        <div className="user">
          <p className="name">{name}</p>
          <p className="account">@{account}</p>
        </div>
      </div>
      <p className="description">{description}</p>
      <p className="created-time">
        {createdAt[0]} · {createdAt[1]}
      </p>
      <div className="amount-footer">
        <p>
          <span>{replyCount || 0}</span> 回覆
        </p>
        <p>
          <span>{likeCount || 0}</span> 喜歡次數
        </p>
      </div>
      <div className="icon-footer">
        <ReplyIcon style={iconSize} onClick={() => setActive(true)} />
        {isLiked ? (
          <LikedIcon style={iconSize} />
        ) : (
          <LikeIcon style={iconSize} />
        )}
      </div>
    </StyledCardContainer>
  );
};

export default TweetCardBig;
