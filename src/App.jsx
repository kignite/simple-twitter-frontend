import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AccounntSetting from "./pages/AccountSetting";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import OtherUserPage from "./pages/OtherUserPage";
import TweetReplyPage from "./pages/TweetReplyPage";
import AdminMainPage from "./pages/AdminMainPage";
import AdminUserList from "./pages/AdminUserList";
import FollowPage from "./pages/FollowPage";
import { AuthProvider } from "./contexts/AuthContext";
import OtherFollowPage from "./pages/OtherFollowPage";

function App() {
  //要記得重構，在單一推文頁刷新會取到初始的空值
  const [tweetId, setTweetId] = useState(0);
  // const tweetIdRef = useRef(tweetId);
  // const currentTweetId = tweetIdRef.current;

  //Modal的開關
  //reply的
  const [active, setActive] = useState(false);
  //tweet的
  const [tweetModalActive, setTweetModalActive] = useState(false);



  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="admin" element={<AdminLoginPage />} />
            <Route path="regist" element={<RegisterPage />} />
            <Route path="admin_main" element={<AdminMainPage />} />
            <Route path="admin_users" element={<AdminUserList />} />
            {/* <Route path="setting" element={<AccounntSetting />} /> */}
            {/* <Route path="/" element={<Layout />}/> */}
            <Route path="/" element={<Layout active={tweetModalActive} setActive={setTweetModalActive} />}>
              <Route path="*" element={<HomePage setTweetId={setTweetId} active={active} setActive={setActive} />} />
              <Route
                path="main"
                element={<HomePage setTweetId={setTweetId} active={active} setActive={setActive} />}
              />
              <Route
                path="reply_list"
                element={<TweetReplyPage tweetId={tweetId} active={active} setActive={setActive} />}
              />
              <Route path="setting" element={<AccounntSetting />} />;
              <Route
                path="user/self"
                element={<UserPage setTweetId={setTweetId} />}
              />
              <Route
                path="user/self/follower"
                element={<FollowPage pageStatus="follower" />}
              />
              <Route
                path="user/self/following"
                element={<FollowPage pageStatus="following" />}
              />
              <Route path="user/other" element={<OtherUserPage />} />
              <Route
                path="user/other/follower"
                element={<OtherFollowPage pageStatus="follower" />}
              />
              <Route
                path="user/other/following"
                element={<OtherFollowPage pageStatus="following" />}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
