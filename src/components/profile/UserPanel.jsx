import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { StyledTabbar } from "../common/tab.styled";
import TweetCard from "../common/cards/TweetCard";
import CommentCard from "../common/cards/CommentCard";
import Backdrop from "../Backdrop";
import Modal from "../common/Modal";
import {
  getUserTweets,
  getUserReplies,
  getUserLikes,
} from "../../api/getUserTweets";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation, useSearchParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

const UserPanel = ({ personalInfo, active, setActive }) => {
  const [activeTab, setActiveTab] = useState("tweet");
  const [panelData, setPanelData] = useState([]);
  const [replyToData, setReplyToData] = useState({});
  const [searchParams] = useSearchParams();
  const { key } = useLocation();
  const { isAuthenticated, currentMember } = useAuth();

  useEffect(() => {
    console.log(personalInfo);
    console.log(personalInfo.id);
    let ignore = false;
    const getPanelData = async () => {
      const token = localStorage.getItem("token") || null;
      let id = personalInfo.id;
      if (personalInfo.id === undefined && currentMember.id === searchParams.get("id")) {
        id = jwtDecode(token).id;
      } else if (currentMember.id !== personalInfo.id) {
        id = searchParams.get("id") || personalInfo.id || currentMember.id;
      }

      switch (activeTab) {
        case "tweet": {
          const { data } = await getUserTweets({ token, id });
          if (!ignore) {
            setPanelData([...data]);
          }
          break;
        }
        case "reply": {
          const { data } = await getUserReplies({ token, id });
          if (!ignore) {
            setPanelData([...data]);
          }
          break;
        }
        case "like": {
          const { data } = await getUserLikes({ token, id });
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
    if (!isAuthenticated || currentMember.role !== "user") return;

    getPanelData();

    return () => {
      ignore = true;
    };
  }, [activeTab, key, isAuthenticated]);

  // useEffect(() => {
  //   setReplyToData(replyToData);
  //   console.log(replyToData);
  // }, [replyToData])

  return (
    <div className="user-panel">
      <Backdrop active={active}>
        <Modal
          tweetId={replyToData.tweetId}
          active={active}
          setActive={setActive}
          avatar={replyToData.avatar}
          name={replyToData.name}
          account={replyToData.account}
          createdAt={replyToData.createdAt}
          description={replyToData.description}
          onReply={true}
          onPages={true}
          personalInfo={personalInfo} //只有這個是自己
        />
      </Backdrop>
      <StyledTabbar>
        <button
          className={
            "user-action-tab" + clsx(" ", { active: activeTab === "tweet" })
          }
          onClick={() => {
            if (activeTab !== "tweet") {
              setPanelData([]);
            }
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
            if (activeTab !== "reply") {
              setPanelData([]);
            }
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
            if (activeTab !== "like") {
              setPanelData([]);
            }
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
                userId={item.UserId}
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
                userId={item.User.id}
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
                setActive={setActive}
                setReplyToData={setReplyToData}
              />
            );
          } else { //使用者喜歡的內容
            return (
              <TweetCard
                key={item.id}
                tweetId={item.TweetId}
                userId={item.Tweet.User.id}
                personalInfo={personalInfo}
                avatar={item.Tweet.User.avatar}
                name={item.Tweet.User.name}
                account={item.Tweet.User.account}
                createdAt={item.Tweet.createdAt}
                description={item.Tweet.description}
                replyCount={item.Tweet.replyCount}
                likeCount={item.Tweet.likeCount}
                isLiked={item.Tweet.isLiked}
                setActive={setActive}
                setReplyToData={setReplyToData}
                setPanelData={setPanelData}
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
