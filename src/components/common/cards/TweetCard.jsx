import React, { useState } from "react";
import styled from "styled-components";
import { ReplyIcon, LikeIcon, LikedIcon } from "../../../assets/icons";
import Backdrop from "../../Backdrop";
import Modal from "../Modal";

export const StyledCardContainer = styled.div`
  display: flex;
  padding: 16px 0;
  border: 1px solid ${(props) => (props.modal ? "transparent" : "#E6ECF0")};
  /* cursor: ${(props) => (props.comment ? "default" : "pointer")}; */

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 24px;
    margin-right: 8px;
  }
  .left-side {
    position: relative;
    display: flex;
    flex-direction: column;
    /* border: 2px solid; */
  }

  .right-side {
    .name {
      font-size: 16px;
      font-weight: 700;
      line-height: 26px;
      margin-right: 8px;
    }

    .account,
    .created-time,
    .reply-to {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: var(--account_text-in-main);
    }
    .reply-to {
      span {
        color: var(--main_orange);
      }
    }
    p {
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      margin-right: 24px;
    }

    .user-actions {
      margin-top: 9px;
      span {
        margin-right: 41.3px;

        font-family: "Montserrat", sans-serif;
        font-size: 14px;
        font-weight: 600;
        line-height: 14px;
        color: var(--account_text-in-main);
      }
    }
  }
`;

const TweetCard = ({
  tweetId,
  personalInfo,
  avatar,
  name,
  account,
  createdAt,
  description,
  replyCount,
  likeCount,
  isLiked,
}) => {
  const [active, setActive] = useState(false);

  const iconSize = {
    width: "13.2px",
    height: "13px",
    marginRight: "9px",
  };
  return (
    <>
      <Backdrop active={active} setActive={setActive} />
      <Modal
        tweetid={tweetId}
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
      <StyledCardContainer>
        <img src={avatar} alt={name} />
        <div className="right-side">
          <span className="name">{name}</span>
          <span className="account">@{account}</span>
          <span className="created-time"> · {createdAt}</span>
          <p>{description}</p>
          <div className="user-actions">
            <span className="reply">
              <ReplyIcon style={iconSize} onClick={() => setActive(true)} />
              {replyCount}
            </span>
            <span className="like">
              {isLiked ? (
                <LikedIcon style={iconSize} />
              ) : (
                <LikeIcon style={iconSize} />
              )}
              {likeCount}
            </span>
          </div>
        </div>
      </StyledCardContainer>
    </>
  );
};

export default TweetCard;
