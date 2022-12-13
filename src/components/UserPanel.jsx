import React, { useEffect, useState } from "react";
import { getUserTweet } from "../api/getUserTweets";

const UserPanel = () => {
  const [tweetsData, setTweetsData] = useState([
    {
      id: 4,
      description:
        "Et maiores totam quae veritatis quo alias qui sunt. Esse corrupti quis",
      createdAt: "3 天前",
      replyCount: 3,
      likeCount: 0,
      isLiked: 0,
      User: {
        id: 14,
        name: "user1",
        account: "user1",
        avatar: "https://loremflickr.com/320/240/man,woman/?random=74",
      },
    },
  ]);

  // const PostTweets = (arr) => {
  //   console.log(arr);
  //   return (
  //     <>
  //       <div className="id">{arr[0]}</div>
  //       {arr.map((item) => (
  //         <div className="id" key={item.id}>
  //           123
  //         </div>
  //       ))}
  //     </>
  //   );
  // };

  useEffect(() => {
    const getTweetsData = async () => {
      const id = 14;
      const token = localStorage.getItem("token") || null;
      const { data } = await getUserTweet({ id, token });
      setTweetsData(data);
    };

    getTweetsData();
  }, []);

  return (
    <div className="user-panel">
      <div className="tweet-list">
        {tweetsData.map((tweet) => (
          <div className="tweet-card" key={tweet.id}>
            <h3 className="name">
              {`${tweet.User.name} @${tweet.User.account} .${tweet.createdAt}`}
            </h3>
            <p>{tweet.description}</p>
            <div className="reply-like">
              <span className="reply"> 口 {tweet.replyCount}</span>
              <span className="like"> ♡ {tweet.isLiked}</span>
            </div>
          </div>
        ))}
      </div>
      {/* <PostTweets arr={tweetsData} /> */}
    </div>
  );
};

export default UserPanel;
