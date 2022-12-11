import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const handleClick = () => {
    // console.log("hi")
    localStorage.removeItem("token");
  };
  return (
    <div className="sidebar">
      <div className="icon">@</div>
      <div>
        <div>icon</div>
        <a href="">首頁</a>
      </div>
      <div>
        <div>icon</div>
        <a href="">個人資料</a>
      </div>
      <div>
        <div>icon</div>
        <a href="">設定</a>
      </div>
      <button>推文</button>
      <Link to="login" onClick={handleClick}>
        {" "}
        登出{" "}
      </Link>
    </div>
  );
};

export default Sidebar;
