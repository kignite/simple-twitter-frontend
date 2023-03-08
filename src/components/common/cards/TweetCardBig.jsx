import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ReplyIcon, LikeIcon, LikedIcon } from "../../../assets/icons";
import Backdrop from "../../Backdrop";
import Modal from "../Modal";
// import { postReply } from "../../../api/getUserTweets";
import { postTweetLike, postTweetUnLike } from "../../../api/getTweetsRelated";

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
  personalInfo,
  active,
  setActive
}) => {
  const [likeStatus, setLikeStatus] = useState(isLiked);
  const [newLikeCount, setNewLikeCount] = useState(likeCount);
  const token = localStorage.getItem("token");
  //從動態路由拿到tweetId後還拿不到其他資料，要等取得單一推文資料成功後再初始化以下數值一次...
  useEffect(() => {
    setLikeStatus(isLiked);
    setNewLikeCount(likeCount);
  }, [isLiked, likeCount])


  const iconSize = {
    width: "25px",
    height: "25px",
    marginRight: "133px",
    cursor: "pointer", //加上點擊指標
  };

  //handleLike
  const handleLikeClicked = async () => {
    try {
      const status = await postTweetLike({ tweetId, token });
      if (status === 200) {
        setLikeStatus(1);
        setNewLikeCount(newLikeCount + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //handleUnLike
  const handleUnLikeClicked = async () => {
    try {
      const status = await postTweetUnLike({ tweetId, token: token });
      if (status === 200) {
        setLikeStatus(0);
        setNewLikeCount(newLikeCount - 1);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <StyledCardContainer>
      <Backdrop active={active}>
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
      </Backdrop>
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
          <span>{replyCount}</span> 回覆
        </p>
        <p>
          <span>{newLikeCount}</span> 喜歡次數
        </p>
      </div>
      <div className="icon-footer">
        <ReplyIcon style={iconSize} onClick={() => {
          setActive(true);
          }} />
        {likeStatus ? (
          <LikedIcon style={iconSize} onClick={handleUnLikeClicked} />
        ) : (
          <LikeIcon style={iconSize} onClick={handleLikeClicked} />
        )}
      </div>
    </StyledCardContainer>
  );
};

export default TweetCardBig;
