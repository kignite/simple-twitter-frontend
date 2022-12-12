import React from "react";
import styled from "styled-components";

const UserPageStyle = styled.div`
  height: 80vh;
  border: 1px solid;
  display: grid;
  grid-template-rows: 74px 410px 678px;
`;

const UserInfoPicture = styled.div`
  position: relative;
  height: 200px;
  background: url("https://picsum.photos/seed/picsum/800/200");
  img {
    box-sizing: border-box;
    position: absolute;
    bottom: -25%;
    left: 10px;
    border-radius: 50%;
    border: 5px solid white;
  }
  button {
    position: absolute;
    bottom: -25%;
    right: 10px;
  }
`;

const UserInfoText = styled.div`
  margin-top: 72px;
`;

const UserPage = () => {
  const handleClick = () => {
    console.log("編輯個人資料");
  };
  return (
    <UserPageStyle>
      <div className="user-name">John Doe</div>
      <div className="user-info-container">
        <UserInfoPicture>
          <img
            src="https://picsum.photos/id/237/140/140"
            alt=""
            className="avatar"
          />
          <button onClick={handleClick}>編輯個人資料</button>
        </UserInfoPicture>
        <UserInfoText>
          <div className="name">John Dee</div>
          <div className="at">@heyjohn</div>
          <p className="introuduction">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos,
            eveniet.
          </p>
        </UserInfoText>
      </div>
      <div className="user-panel">panel</div>
    </UserPageStyle>
  );
};
export default UserPage;
