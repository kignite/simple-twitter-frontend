import React, { useEffect, useState } from "react";
import styled from "styled-components";
import clsx from "clsx";
import TweetCard from "../common/cards/TweetCard";
import CommentCard from "../common/cards/CommentCard";
import {
  getUserTweets,
  getUserReplies,
  getUserLikes,
} from "../../api/getUserTweets";

export const StyledTabbar = styled.div`
  display: flex;
  .user-action-tab {
    width: 130px;
    padding-bottom: 15px;
    border: none;
    border-bottom: 2px solid var(--border_gray);

    font-size: 15px;
    font-weight: 700;
    color: var(--tab-unactive_gray);
    background-color: transparent;
    cursor: pointer;

    &.active {
      border-bottom-color: var(--main_orange);
      color: var(--main_orange);
    }
  }
`;

const UserPanel = () => {
  const [activeTab, setActiveTab] = useState("reply");
  const [panelData, setPanelData] = useState([]);
  useEffect(() => {
    const getPanelData = async () => {
      const id = 34;
      const token = localStorage.getItem("token") || null;
      switch (activeTab) {
        case "tweet": {
          const { data } = await getUserTweets({ id, token });

          setPanelData(data);

          break;
        }
        case "reply": {
          const { data } = await getUserReplies({ id, token });

          setPanelData(data);

          break;
        }
        case "like": {
          const { data } = await getUserLikes({ id, token });

          setPanelData(data);

          break;
        }
      }
    };
    getPanelData();
    console.log("effect");

    return () => {
      setPanelData([]);
    };
  }, [activeTab]);

  return (
    <div className="user-panel">
      <StyledTabbar>
        <button
          className={
            "user-action-tab" + clsx(" ", { active: activeTab === "tweet" })
          }
          onClick={() => {
            setActiveTab("tweet");
          }}
        >
          推文
        </button>
        <button
          className={
            "user-action-tab" + clsx(" ", { active: activeTab === "reply" })
          }
          onClick={() => {
            setActiveTab("reply");
          }}
        >
          回覆
        </button>
        <button
          className={
            "user-action-tab" + clsx(" ", { active: activeTab === "like" })
          }
          onClick={() => {
            setActiveTab("like");
          }}
        >
          喜歡的內容
        </button>
      </StyledTabbar>
      <div className="tweet-list">
        {panelData.map((item) => {
          if (activeTab === "reply") {
            {
              console.log(item);
            }
            return (
              <CommentCard
                key={item.id}
                avatar={item.User.avatar}
                name={item.User.name}
                account={item.User.account}
                createdAt={item.createdAt}
                replyTo={item.Tweet.User.account}
                comment={item.comment}
              />
            );
          } else if (activeTab === "tweet") {
            {
              console.log(item);
            }

            return (
              <TweetCard
                key={item.id}
                avatar={item.User.avatar}
                name={item.User.name}
                account={item.User.account}
                createdAt={item.createdAt}
                description={item.description}
                replyCount={item.replyCount}
                likeCount={item.likeCount}
                isLiked={item.isLiked}
              />
            );
          } else {
            console.log(item);
            return (
              <TweetCard
                key={item.id}
                avatar={item.Tweet.User.avatar}
                name={item.Tweet.User.name}
                account={item.Tweet.User.account}
                createdAt={item.Tweet.createdAt}
                description={item.Tweet.description}
                replyCount={item.Tweet.replyCount}
                likeCount={item.Tweet.likeCount}
                isLiked={item.Tweet.isLiked}
              />
            );
          }
        })}
      </div>
      {/* <PostTweets arr={tweetsData} /> */}
    </div>
  );
};

export default UserPanel;
