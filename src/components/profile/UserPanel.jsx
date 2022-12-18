import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { StyledTabbar } from "../common/tab.styled";
import TweetCard from "../common/cards/TweetCard";
import CommentCard from "../common/cards/CommentCard";
import {
  getUserTweets,
  getUserReplies,
  getUserLikes,
} from "../../api/getUserTweets";

const UserPanel = ({ personalInfo }) => {
  const [activeTab, setActiveTab] = useState("reply");
  const [panelData, setPanelData] = useState([]);

  useEffect(() => {
    let ignore = false;
    const getPanelData = async () => {
      const token = localStorage.getItem("token") || null;
      switch (activeTab) {
        case "tweet": {
          const { data } = await getUserTweets({ token });
          if (!ignore) {
            setPanelData([...data]);
          }
          break;
        }
        case "reply": {
          const { data } = await getUserReplies({ token });
          if (!ignore) {
            setPanelData([...data]);
          }
          break;
        }
        case "like": {
          const { data } = await getUserLikes({ token });
          if (!ignore) {
            setPanelData([...data]);
          }
          break;
        }
        default: {
          setPanelData([]);
          break;
        }
      }
    };
    getPanelData();

    return () => {
      ignore = true;
    };
  }, [activeTab, personalInfo]);

  return (
    <div className="user-panel">
      <StyledTabbar>
        <button
          className={
            "user-action-tab" + clsx(" ", { active: activeTab === "tweet" })
          }
          onClick={() => {
            setPanelData([]);
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
            setPanelData([]);
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
            setPanelData([]);
            setActiveTab("like");
          }}
        >
          喜歡的內容
        </button>
      </StyledTabbar>
      <div className="tweet-list">
        {panelData.map((item) => {
          if (activeTab === "reply") {
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
            return (
              <TweetCard
                key={item.id}
                tweetid={item.id}
                personalInfo={personalInfo}
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
            return (
              <TweetCard
                key={item.id}
                id={item.id}
                personalInfo={personalInfo}
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
