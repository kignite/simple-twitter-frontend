import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TweetCard from "../components/common/cards/TweetCard";
import { StyledButton } from "../components/common/button.styled";
import { getUserInfo, postTweet } from "../api/getUserTweets";
import { getAllTweets } from "../api/getTweetsRelated";
import { useAuth } from "../contexts/AuthContext";
// import { useSearchParams } from "react-router-dom";
import Backdrop from "../components/Backdrop";
import Modal from "../components/common/Modal";
import Swal from "sweetalert2";

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
  .action-panel {
    display: flex;
    justify-content: end;
    align-items: center;
    position: absolute;
    bottom: 16px;
    right: 24px;
    .error-msg {
      margin-right: 20px;

      font-weight: 500;
      font-size: 15px;
      line-height: 15px;
      color: var(--main_error);
    }
  }
`;

const HomeTweetslist = ({ token, handlePost, active, setActive }) => {
  const [tweetsData, setTweetsData] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({});
  const [replyToData, setReplyToData] = useState({});
  const { isAuthenticated, currentMember } = useAuth();
  const [replyTweetId, setReplyTweetId] = useState();

  //取得所有推文
  useEffect(() => {
    const getTweets = async () => {
      const { data } = await getAllTweets({ token });
      setTweetsData([...data]);
    };

    if (!isAuthenticated || currentMember.role !== "user") return;
    getTweets();
  }, [handlePost, active]);

  useEffect(() => {
    const getPersonalInfo = async () => {
      const id = currentMember.id;
      const data = await getUserInfo({ token, id });
      setPersonalInfo(data);
    };
    if (!isAuthenticated || currentMember.role !== "user") return;
    getPersonalInfo();
  }, []);

  return (
    <ul className="tweet-list">
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
          setReplyTweetId={setReplyTweetId}
        />
      </Backdrop>
      {tweetsData.map((tweet) => (
        <TweetCard
          key={tweet.id}
          userId={tweet.User.id}
          tweetId={tweet.id}
          personalInfo={personalInfo}
          avatar={tweet.User.avatar}
          name={tweet.User.name}
          account={tweet.User.account}
          createdAt={tweet.createdAt}
          description={tweet.description}
          replyCount={tweet.replyCount}
          likeCount={tweet.likeCount}
          isLiked={tweet.isLiked}
          setActive={setActive}
          setReplyToData={setReplyToData}
          replyTweetId={replyTweetId}
          setReplyTweetId={setReplyTweetId}
        />
      ))}
    </ul>
  );
};

const HomePage = ({ active, setActive }) => {
  const [avatar, setAvatar] = useState("");
  // const [personalInfo, setPersonalInfo] = useState({});
  const [tweetText, setTweetText] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const token = localStorage.getItem("token") || null;
  const { isAuthenticated, currentMember } = useAuth();

  const handleChange = (e) => {
    setErrorMsg(null);
    setTweetText(e.target.value);
  };

  const handlePost = async () => {
    if (tweetText.length === 0) {
      setErrorMsg("內容不可空白");
      return;
    }
    const tweet = { description: tweetText };
    const status = await postTweet({ token, tweet });

    setTweetText("");
    if (status === 200) {
      Swal.fire({
        position: "top",
        title: "推文發送成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        position: "top",
        title: "推文發送失敗！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    const getCurrentUserAvatar = async () => {
      const id = currentMember.id;
      const data = await getUserInfo({ token, id });
      setAvatar(data.avatar);
    };
    if (!isAuthenticated || currentMember.role !== "user") return;

    getCurrentUserAvatar();
  }, [isAuthenticated]);

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
          <div className="action-panel">
            <p className="error-msg">
              {tweetText.length > 140 ? "字數不可超過 140 字" : ""}
              {errorMsg !== null && errorMsg}
            </p>
            <StyledButton className="post-tweet active" onClick={handlePost}>
              推文
            </StyledButton>
          </div>
        </StyledTextareaContainer>
        <div className="devider"></div>
      </div>
      <HomeTweetslist
        token={token}
        handlePost={handlePost}
        active={active}
        setActive={setActive}
      />
    </HomePageStyle>
  );
};
export default HomePage;
