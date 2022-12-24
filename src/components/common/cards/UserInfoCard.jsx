import React from "react";
import styled from "styled-components";
import { TweetIcon, LikeIcon } from "../../../assets/icons";

const CardStyled = styled.div`
  height: 314px;
  width: 100%;
  /* max-width: 250px; */
  background-color: var(--card-background_gray);
  border-radius: 10px;
  text-align: center;

  .img-area {
    position: relative;
    width: 100%;
    height: 140px;

    .cover {
      width: 100%;
      height: 140px;
      border-radius: 10px 10px 0px 0px;
    }

    .avatar {
      position: absolute;
      top: 64px;
      left: 0;
      right: 0;
      margin: 0 auto;

      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 4px solid var(--main_white);
    }
  }
  .text-area {
    padding: 32px 10px 24px 10px;
    margin: 0 auto;
    text-align: center;
    width: 200px;
    

    .name {
      font-weight: 700;
      font-size: 1px;
      line-height: 26px;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

    }

    .account {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: var(--main_secondary);

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

    }
    .tweet-like {
      margin: 16px 0 8px 0;
      font-size: 16px;
      line-height: 26px;
      display: flex;
      justify-content: center;
      align-items: center;

      .like-icon {
        margin-left: 18px;
      }
      .number {
        margin-left: 8px;
      }
      .tweet-number, .like-number {
        font-family: "Montserrat";
        font-weight: 500;
        font-size: 16px;
        line-height: 15px;
      }
    }

    .following-follower {
      font-weight: 400;
      font-size: 14px;

      .follower {
        margin-left: 8px;
      }

      .text {
        color: var(--main_secondary);
      }
    }
  }
`;
const UserInfoCard = ({
  cover,
  avatar,
  name,
  account,
  tweetCount,
  likeCount,
  followingCount,
  followerCount,
}) => {
  return (
    <CardStyled>
      <div className="img-area">
        <img src={cover} alt="" className="cover" />
        <img src={avatar} alt="" className="avatar" />
      </div>
      <div className="text-area">
        <div className="name-account">
          <h4 className="name">{name}</h4>
          <span className="account">@{account}</span>
        </div>
        <div className="tweet-like">
          <span className="tweet-icon">
            <TweetIcon />
          </span>
          <span className="tweet-number number">{tweetCount}</span>
          <span className="like-icon">
            <LikeIcon />
          </span>
          <span className="like-number number">{likeCount}</span>
        </div>
        <div className="following-follower">
          <span className="following">
            <span className="number">{followingCount} 個</span>
            <span className="text">跟隨中</span>
          </span>
          <span className="follower">
            <span className="number">{followerCount} 位</span>
            <span className="text">跟隨者</span>
          </span>
        </div>
      </div>
    </CardStyled>
  );
};

export default UserInfoCard;
