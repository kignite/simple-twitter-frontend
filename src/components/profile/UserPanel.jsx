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
import { useNavigate } from "react-router-dom";

const UserPanel = ({ personalInfo, onTweetClick }) => {
  const [activeTab, setActiveTab] = useState("tweet");
  const [panelData, setPanelData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const getPanelData = async () => {
      const token = localStorage.getItem("token") || null;
      // 如需調整使用者請先手動 自己role=user id=14;
      const id = personalInfo.id;
      const role = "user";
      switch (activeTab) {
        case "tweet": {
          const { data } = await getUserTweets({ token, id, role });
          if (!ignore) {
            setPanelData([...data]);
          }
          break;
        }
        case "reply": {
          const { data } = await getUserReplies({ token, id, role });
          if (!ignore) {
            setPanelData([...data]);
          }
          break;
        }
        case "like": {
          const { data } = await getUserLikes({ token, id, role });
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
                tweetId={item.id}
                personalInfo={personalInfo}
                avatar={item.User.avatar}
                name={item.User.name}
                account={item.User.account}
                createdAt={item.createdAt}
                description={item.description}
                replyCount={item.replyCount}
                likeCount={item.likeCount}
                isLiked={item.isLiked}
                onClick={() => {
                  onTweetClick?.(item.id);
                  navigate('/reply_list');
                }}
              />
            );
          } else {
            return (
              <TweetCard
                key={item.id}
                tweetId={item.TweetId}
                personalInfo={personalInfo}
                avatar={item.Tweet.User.avatar}
                name={item.Tweet.User.name}
                account={item.Tweet.User.account}
                createdAt={item.Tweet.createdAt}
                description={item.Tweet.description}
                replyCount={item.Tweet.replyCount}
                likeCount={item.Tweet.likeCount}
                isLiked={item.Tweet.isLiked}
                onClick={() => {
                  onTweetClick?.(item.TweetId);
                  navigate('/reply_list');
                }}
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
