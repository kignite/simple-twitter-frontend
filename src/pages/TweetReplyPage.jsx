import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TweetCardBig from "../components/common/cards/TweetCardBig";
import CommentCard from "../components/common/cards/CommentCard";
import { TurnbackIcon } from "../assets/icons";
import { getOneTweet, getOneTweetReplies } from "../api/getTweetsRelated";
import { useNavigate } from "react-router-dom";

const TweetReplyPageStyle = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  border: 1px solid var(--border_gray);
  overflow-y: scroll;
  overflow-x: hidden;
  header {
    display: flex;
    align-items: center;
    height: 74px;
    padding-left: 24px;
    border-bottom: 1px solid var(--border_gray);
    background-color: var(--main_white);
    position: sticky; //還沒資料看不出效果
    top: 0;
  }
  h4 {
    margin-left: 19px;
    font-size: 24px;
    font-weight: 700;
    line-height: 26px;
    color: var(--main_text);
  }

  .return {
    cursor: pointer;
  }
`;

const TweetReplyPage = ({tweetId}) => {
  const [tweetData, setTweetData] = useState({
    "id": 0,
    "createdAt": "0",
    "description": "0",
    "replyCount": 0,
    "likeCount": 0,
    "isLiked": 0,
    "User": {
      "id": 0,
      "avatar": "0",
      "account": "0",
      "name": "0"
    }
  });
  const [tweetReplies, setTweetReplies] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log(tweetId);

  useEffect(() => {
    //發送取得單一推文資料的請求
    const getOneSpecificTweet = async () => {
      const {data} = await getOneTweet({id: tweetId, token});
      setTweetData(data);
    };
    //發送取得單一推文回覆串的請求
    const getOneSpecificTweetReplies = async () => {
      const {data} = await getOneTweetReplies({id: tweetId, token});
      setTweetReplies([...data])
    };

    getOneSpecificTweet();
    getOneSpecificTweetReplies();
  }, [tweetId])

  return (
    <TweetReplyPageStyle>
      <header>
        <TurnbackIcon className="return" onClick={() => {
          navigate(-1);
        }} />
        <h4>推文</h4>
      </header>
      <TweetCardBig
        avatar={tweetData.User.avatar}
        name={tweetData.User.name}
        account={tweetData.User.account}
        description={tweetData.description}
        createdAt={tweetData.createdAt}
        replyCount={tweetData.replyCount}
        likeCount={tweetData.likeCount}
        isLiked={tweetData.isLiked}
      />
      {tweetReplies.map(reply =>
        <CommentCard
          key={reply.id}
          avatar={reply.User.avatar}
          name={reply.User.name}
          account={reply.User.account}
          createdAt={reply.createdAt}
          replyTo={tweetData.User.account}
          comment={reply.comment}
        />
      )}
    </TweetReplyPageStyle>
  );
};

export default TweetReplyPage;