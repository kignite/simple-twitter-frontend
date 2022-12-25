import React, { useState, createContext } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
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

//追蹤的Clicking 用Context給值
export const ClickingContext = createContext({
  clicking: false,
  setClicking: null,
});


function App() {

  //Modal的開關
  //reply的
  const [active, setActive] = useState(false);
  //tweet的
  const [tweetModalActive, setTweetModalActive] = useState(false);

  //追蹤的Clicking
  const [clicking, setClicking] = useState(false);

  return (
    <div className="App">
      <HashRouter>
        <AuthProvider>
          <ClickingContext.Provider value={{clicking, setClicking}}>
            <Routes> {/*test: 全部前面先加上layout*/}
              <Route path="*" element={<LoginPage />} />
              <Route path="/layout/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminLoginPage />} />
              <Route path="/regist" element={<RegisterPage />} />
              <Route path="/admin_main" element={<AdminMainPage />} />
              <Route path="/admin_users" element={<AdminUserList />} />
              {/* <Route path="setting" element={<AccounntSetting />} /> */}
              {/* <Route path="/" element={<Layout />}/> */}
              <Route path="/layout" element={<Layout active={tweetModalActive} setActive={setTweetModalActive} />}>
                {/* <Route path="*" element={<HomePage active={active} setActive={setActive} />} /> */}
                <Route
                  path="main"
                  element={<HomePage active={active} setActive={setActive} />}
                />
                <Route
                  path="reply_list"
                  element={<TweetReplyPage active={active} setActive={setActive} />}
                />
                {/* <Route path="setting" element={<AccounntSetting />} /> */}
                <Route
                  path="user/self"
                  element={<UserPage active={active} setActive={setActive} tweetModalActive={tweetModalActive} />}
                />
                <Route
                  path="user/self/follower"
                  element={<FollowPage pageStatus="follower" />}
                />
                <Route
                  path="user/self/following"
                  element={<FollowPage pageStatus="following" />}
                />
                <Route path="user/other" element={<OtherUserPage active={active} setActive={setActive} />} />
                <Route
                  path="user/other/follower"
                  element={<OtherFollowPage pageStatus="follower" />}
                />
                <Route
                  path="user/other/following"
                  element={<OtherFollowPage pageStatus="following" />}
                />
              </Route>
              <Route path="/layout" element={<Layout onSettingPage={true} active={tweetModalActive} setActive={setTweetModalActive} />}>
                <Route path="setting" element={<AccounntSetting />} />
              </Route>
            </Routes>
          </ClickingContext.Provider>
        </AuthProvider>
      </HashRouter>
    </div>
  );
}

export default App;
