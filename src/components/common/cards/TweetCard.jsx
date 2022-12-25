import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReplyIcon, LikeIcon, LikedIcon } from "../../../assets/icons";
// import Backdrop from "../../Backdrop";
// import Modal from "../Modal";
import { postTweetLike, postTweetUnLike } from "../../../api/getTweetsRelated";
import { useAuth } from "../../../contexts/AuthContext";

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
      z-index: 3;
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
  userId,
  tweetId,
  avatar,
  name,
  account,
  createdAt,
  description,
  replyCount,
  likeCount,
  isLiked,
  setActive,
  setReplyToData,
  setPanelData,
  replyTweetId,
  setReplyTweetId,
}) => {
  // const [active, setActive] = useState(false);
  const [likeStatus, setLikeStatus] = useState(isLiked);
  const [newLikeCount, setNewLikeCount] = useState(likeCount);
  const [localReplyCount, setLocalReplyCount] = useState(replyCount);
  const token = localStorage.getItem("token");
  // console.log('tweet', tweetId);
  const { currentMember } = useAuth();

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
      // const token = localStorage.getItem('token');
      const status = await postTweetUnLike({ tweetId, token: token });
      if (status === 200) {
        setLikeStatus(0);
        setNewLikeCount(newLikeCount - 1);
        setPanelData((prevData) => {
          return prevData.filter((prev) => prev.TweetId !== tweetId);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const iconSize = {
    width: "13.2px",
    height: "13px",
    marginRight: "9px",
  };

  useEffect(() => {
    if (replyTweetId === tweetId) {
      setLocalReplyCount((prev) => prev + 1);
      setReplyTweetId();
    } else return;
    console.log(replyTweetId);
  }, [replyTweetId]);

  return (
    <StyledCardContainer>
      <Link
        to={
          currentMember.id === userId
            ? `/layout/user/self`
            : `/layout/user/other/?id=${userId}`
        }
      >
        <img src={avatar} alt="" />
      </Link>
      <div className="right-side">
        <span className="name">
          <Link
            to={
              currentMember.id === userId
                ? `/layout/user/self`
                : `/layout/user/other/?id=${userId}`
            }
          >
            {name}
          </Link>
        </span>
        <span className="account">@{account}</span>
        <span className="created-time"> · {createdAt}</span>
        <Link to={`/layout/reply_list/?reply_to=${tweetId}`}>
          <p>{description}</p>
        </Link>
        <div className="user-actions">
          <span className="reply">
            <Link to={`#/${userId}/reply_modal`}>
              <ReplyIcon
                style={iconSize}
                onClick={() => {
                  setReplyToData({
                    tweetId,
                    avatar,
                    name,
                    account,
                    createdAt,
                    description,
                  });
                  setActive(true);
                  console.log(tweetId);
                }}
              />
            </Link>
            {localReplyCount}
          </span>
          <span className="like">
            {likeStatus ? (
              <LikedIcon style={iconSize} onClick={handleUnLikeClicked} />
            ) : (
              <LikeIcon style={iconSize} onClick={handleLikeClicked} />
            )}
            {newLikeCount}
          </span>
        </div>
      </div>
    </StyledCardContainer>
  );
};

export default TweetCard;
