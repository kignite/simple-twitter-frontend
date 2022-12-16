import React from "react";
import styled from "styled-components";
// import { uploadUserInfo } from "../../api/getUserTweets";
import Input from "../AuthInput";

const ModalStyle = styled.div`
  box-sizing: border-box;
  height: 610px;
  width: 638px;
  position: fixed;
  top: 56px;
  border-radius: 14px;
  /* background-color: red; */
  z-index: 200;
  background-color: var(--main_white);

  .modal-title {
    display: flex;
    justify-content: space-around;
  }
`;

const UserInfoPicture = styled.div`
  position: relative;
  height: 200px;
  background: url("https://picsum.photos/seed/picsum/800/200");
  .modal-avatar img {
    box-sizing: border-box;
    position: absolute;
    bottom: -25%;
    left: 10px;
    border-radius: 50%;
    border: 5px solid white;
  }
  .modal-background {
    box-sizing: border-box;
    height: 200px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const UserInfoText = styled.div`
  width: 100%;
  margin-top: 72px;
`;



const EditInfoModal = ({ active, setActive ,name ,introduction}) => {
  const handleClose = () => {
    setActive(false);
  };

  // const handleUpdateCover = async () => {
  //   setUserInfo({
  //     name: "user6",
  //     account: "user6",
  //     avatar: "https://loremflickr.com/320/240/man,woman/?random=73",
  //     cover: "https://loremflickr.com/320/240/man,woman/?random=73",
  //   });
  //   await uploadUserInfo({
  //     userInfo,
  //     id,
  //     token,
  //   });
  //   console.log(userInfo);
  // };

  const handleChange = (e) => {
    const file = e.target.files;
    console.log(file[0]);
    const imgURL = window.URL.createObjectURL(file[0]);
    console.log(imgURL)
  };
  const handleUpdateAvatar = () => {
    console.log("Avatar");
  };
  return active ? (
    <ModalStyle>
      <div className="modal-title">
        <button className="close-btn" onClick={handleClose}>
          X
        </button>
        <h3 className="edit-info">編輯個人資料</h3>
        <button className="save" onClick={handleClose}>
          儲存
        </button>
      </div>
      <div className="modal-user-info-container">
        <UserInfoPicture>
          <div className="modal-background">
            <input type="file" name="" id="image" onChange={handleChange} />
            <div className="remove-background">x</div>
          </div>
          <div className="modal-avatar">
            <div className="add-picture" onClick={handleUpdateAvatar}>
              +
            </div>
            <img src="https://picsum.photos/id/237/140/140" alt="" />
          </div>
        </UserInfoPicture>
        <UserInfoText>
          <Input label={"名稱"} value={name} />
          <Input label={"自我介紹"} value={introduction} />
        </UserInfoText>
      </div>
    </ModalStyle>
  ) : null;
};
export default EditInfoModal;
