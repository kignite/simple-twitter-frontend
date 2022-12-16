import React, { useEffect } from "react";
import styled from "styled-components";
import Input from "../AuthInput";
import { useState } from "react";
import { uploadUserInfo } from "../../api/getUserTweets";
import { getUserInfo } from "../../api/getUserTweets";

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
  .modal-avatar img {
    box-sizing: border-box;
    position: absolute;
    bottom: -25%;
    left: 10px;
    border-radius: 50%;
    border: 5px solid white;
  }
  .modal-cover img {
    box-sizing: border-box;
    height: 200px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
  }
`;

const UserInfoText = styled.div`
  width: 100%;
  margin-top: 72px;
`;

const EditInfoModal = ({ setActive, id, token }) => {
  // const test = 123;
  const [personalInfo, setPersonalInfo] = useState({});
  const [avatar, setAvatar] = useState();
  const [cover, setCover] = useState();
  const [tmpImg, setTmpImg] = useState({
    avatar: null,
    cover: null,
  });

  const handleClose = () => {
    setActive(false);
  };
  const handleSave = async () => {
    const file = { ...personalInfo, avatar: avatar, cover: cover };
    await uploadUserInfo({ id, token, file });
    setActive(false);
  };

  const handleUploadAvatar = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setTmpImg({ ...tmpImg, avatar: fileReader.result });
    };
    fileReader.readAsDataURL(e.target.files[0]);
    setAvatar(e.target.files[0]);
    setPersonalInfo({ ...personalInfo, avatar: tmpImg.avatar });
  };

  const handleUploadCover = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setTmpImg({ ...tmpImg, cover: fileReader.result });
    };
    fileReader.readAsDataURL(e.target.files[0]);
    setCover(e.target.files[0]);
    setPersonalInfo({ ...personalInfo, cover: tmpImg.cover });
  };

  useEffect(() => {
    const getPersonalInfo = async () => {
      const data = await getUserInfo({ id, token });
      setPersonalInfo(data);
      setTmpImg({ avatar: data.avatar, cover: data.cover });
    };
    getPersonalInfo();
  }, []);

  return (
    <ModalStyle>
      <div className="modal-title">
        <button className="close-btn" onClick={handleClose}>
          X
        </button>
        <h3 className="edit-info">編輯個人資料</h3>
        <button className="save" onClick={handleSave}>
          儲存
        </button>
      </div>
      <div className="modal-user-info-container">
        <UserInfoPicture>
          <div className="modal-cover">
            <img
              width={640}
              height={200}
              src={tmpImg.cover}
              alt=""
              className="cover"
            />
            <input
              type="file"
              name=""
              id="image"
              onChange={handleUploadCover}
            />
            <div className="remove-background">x</div>
          </div>
          <div className="modal-avatar">
            <input
              type="file"
              name=""
              id="image"
              onChange={handleUploadAvatar}
            />
            <img width={100} height={100} src={tmpImg.avatar} alt="" />
          </div>
        </UserInfoPicture>
        <UserInfoText>
          <Input label={"名稱"} value={personalInfo.name} />
          <Input label={"自我介紹"} value={personalInfo.introduction} />
        </UserInfoText>
      </div>
    </ModalStyle>
  );
};
export default EditInfoModal;
