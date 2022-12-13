import React from "react";
import styled from "styled-components";
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

const EditInfoModal = ({ active, setActive }) => {
  const handleClick = () => {
    setActive(false);
  };
  return active ? (
    <ModalStyle>
      <div className="modal-title">
        <button className="close-btn" onClick={handleClick}>
          X
        </button>
        <h3 className="edit-info">編輯個人資料</h3>
        <button className="save" onClick={handleClick}>
          儲存
        </button>
      </div>
      <div className="modal-user-info-container">
        <UserInfoPicture>
          <div className="modal-background">
            <div className="add-background">+</div>
            <div className="remove-background">x</div>
          </div>
          <div className="modal-avatar">
            <div className="add-picture">+</div>
            <img src="https://picsum.photos/id/237/140/140" alt="" />
          </div>
        </UserInfoPicture>
        <UserInfoText>
          <Input label={"名稱"} value={"username"} />
          <Input label={"自我介紹"} value={"username"} />
        </UserInfoText>
      </div>
    </ModalStyle>
  ) : null;
};
export default EditInfoModal;
