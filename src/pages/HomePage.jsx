import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TweetCard from "../components/common/cards/TweetCard";
import { StyledButton } from "../components/common/button.styled";
import { getUserInfo, postTweet } from "../api/getUserTweets";
import { getAllTweets } from "../api/getTweetsRelated";
import { useAuth } from "../contexts/AuthContext";

const HomePageStyle = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  border: 1px solid var(--border_gray);
  overflow-y: scroll;
  overflow-x: hidden;
  .sticky-part {
    position: sticky; //還沒資料看不出效果
    top: 0;
    background-color: var(--main_white);
  }
  header {
    height: 74px;
    padding-left: 24px;
    border-bottom: 1px solid var(--border_gray);
    h4 {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .devider {
    width: 100%;
    height: 10px;
    background-color: var(--border_gray);
  }
`;

export const StyledTextareaContainer = styled.div`
  /* position: relative; */
  display: flex;
  width: 100%;
  height: ${(props) => (props.modal ? "243px" : "136px")};
  img {
    margin: 16px 25px;
    margin-right: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--border_gray);
  }
  textarea {
    width: 85%;
    resize: none;
    border: none;
    &[placeholder] {
      margin-top: 28px;
      margin-left: 8px;
      font-size: 18px;
      font-weight: ${(props) => (props.modal ? "400" : "700")};
      line-height: 26px;
      color: var(--textarea-placeholder);
    }
    outline: 0;
    :focus {
      border: none;
    }
  }
  .post-tweet {
    position: absolute;
    bottom: 16px;
    right: 24px;
  }
`;

const HomeTweetslist = ({ token, onTweetClick }) => {
  const [tweetsData, setTweetsData] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({});
  const { isAuthenticated, currentMember } = useAuth();

  useEffect(() => {
    const getTweets = async () => {
      const { data } = await getAllTweets({ token });
      setTweetsData([...data]);
    };
    const getPersonalInfo = async () => {
      const id = currentMember.id;
      const data = await getUserInfo({ token, id });
      // console.log(data);
      setPersonalInfo(data);
    };
    if (!isAuthenticated || currentMember.role !== "user") return;

    getPersonalInfo();

    getTweets();
  }, []);

  return (
    <ul className="tweet-list">
      {tweetsData.map((tweet) => (
        <TweetCard
          key={tweet.id}
          userId={tweet.User.id}
          tweetid={tweet.id}
          personalInfo={personalInfo}
          avatar={tweet.User.avatar}
          name={tweet.User.name}
          account={tweet.User.account}
          createdAt={tweet.createdAt}
          description={tweet.description}
          replyCount={tweet.replyCount}
          likeCount={tweet.likeCount}
          isLiked={tweet.isLiked}
          onClick={onTweetClick}
        />
      ))}
    </ul>
  );
};

const HomePage = () => {
  const [avatar, setAvatar] = useState("");
  const [tweetText, setTweetText] = useState("");
  const token = localStorage.getItem("token");
  const { isAuthenticated, currentMember } = useAuth();

  const handleChange = (e) => {
    setTweetText(e.target.value);
  };

  const handlePost = async () => {
    if (tweetText.length === 0) {
      console.log("請輸入至少一個字");
      return;
    }
    const tweet = { description: tweetText };
    const status = await postTweet({ token, tweet });

    console.log("成功發文", status);
    setTweetText("");
  };

  useEffect(() => {
    const getCurrentUserAvatar = async () => {
      const id = currentMember.id;

      const data = await getUserInfo({ token, id });
      setAvatar(data.avatar);
    };
    if (!isAuthenticated || currentMember.role !== "user") return;

    getCurrentUserAvatar();
  }, []);

  return (
    <HomePageStyle>
      <div className="sticky-part">
        <header>
          <h4 className="home">首頁</h4>
        </header>
        <StyledTextareaContainer>
          <img src={avatar} alt="你的頭像" />
          <textarea
            name="tweetpost"
            id="tweetpost"
            rows="5"
            placeholder="有什麼新鮮事?"
            value={tweetText}
            onChange={handleChange}
          ></textarea>
          <StyledButton className="post-tweet active" onClick={handlePost}>
            推文
          </StyledButton>
        </StyledTextareaContainer>
        <div className="devider"></div>
      </div>
      <HomeTweetslist token={token} />
    </HomePageStyle>
  );
};
export default HomePage;
