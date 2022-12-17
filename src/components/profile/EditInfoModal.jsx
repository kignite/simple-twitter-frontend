import React, { useEffect } from "react";
import styled from "styled-components";
import Input from "../AuthInput";
import { useState } from "react";
import { uploadUserInfo } from "../../api/getUserTweets";
import { getUserInfo } from "../../api/getUserTweets";
import { CloseIcon, CameraIcon } from "../../assets/icons";
import { StyledButton } from "../common/button.styled";

const ModalStyle = styled.div`
  box-sizing: border-box;
  height: 610px;
  width: 638px;
  position: fixed;
  top: 56px;
  border-radius: 14px;
  overflow: hidden;
  /* background-color: red; */
  z-index: 200;
  background-color: var(--main_white);

  header {
    display: flex;
    height: unset;
    padding: unset;
    .close {
      margin: 20px;
      cursor: pointer;
    }
    .save {
      position: absolute;
      right: 16px;
    }
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
  .modal-cover {
    position: relative;
    img {
      box-sizing: border-box;
      height: 200px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: -1;
    }
    .change-cover-actions {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      z-index: 2;
      .remove-icon {
        path {
          fill: var(--main_white);
        }
      }
    }
  }

  .camera-icon {
    
    input {

    }
  }

`;

const UserInfoText = styled.div`
  width: 100%;
  margin-top: 72px;
`;

const EditInfoModal = ({ setActive, token, personalInfoData }) => {
  const [personalInfo, setPersonalInfo] = useState(personalInfoData);
  const [avatar, setAvatar] = useState();
  const [cover, setCover] = useState();
  const [name, setName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [tmpImg, setTmpImg] = useState({
    avatar: null,
    cover: null,
  });

  const handleClose = () => {
    setActive(false);
  };

  const handleSave = async () => {
    const file = { ...personalInfo, name, introduction, avatar: avatar, cover: cover };
    const id = file.id;
    await uploadUserInfo({ id, token, file });
    setActive(false);
  };

  //上傳頭像
  const handleUploadAvatar = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setTmpImg({ ...tmpImg, avatar: fileReader.result });
    };
    fileReader.readAsDataURL(e.target.files[0]);
    setAvatar(e.target.files[0]);
    setPersonalInfo({ ...personalInfo, avatar: tmpImg.avatar });
  };

  //上傳封面圖
  const handleUploadCover = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setTmpImg({ ...tmpImg, cover: fileReader.result });
    };
    fileReader.readAsDataURL(e.target.files[0]);
    setCover(e.target.files[0]);
    setPersonalInfo({ ...personalInfo, cover: tmpImg.cover });
  };

  //更新名稱
  const handleNameUpdate = (e) => {
    const newName = e.target.value;
    setName(newName);
    setPersonalInfo({ ...personalInfo, name: newName });
  };

  //更新自介
  const handleIntroductionUpdate = (e) => {
    const newIntro = e.target.value;
    setIntroduction(newIntro);
    setPersonalInfo({ ...personalInfo, introduction: newIntro });
  };

  useEffect(() => {
    const getPersonalInfo = async () => {
      console.log(personalInfo)
      const id = personalInfo.id;
      const data = await getUserInfo({ id, token });
      setPersonalInfo(data);
      setTmpImg({ avatar: data.avatar, cover: data.cover });
    };
    getPersonalInfo();
  }, []);

  return (
    <ModalStyle>
      <header>
        <CloseIcon className="close" onClick={handleClose} />
        <h5>編輯個人資料</h5>
        <StyledButton className="save active" onClick={handleSave}>儲存</StyledButton>
      </header>
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
            <div className="change-cover-actions">
              <div className="camera-icon">
                <CameraIcon />
                <input type="file" name="cover" id="image" onChange={handleUploadCover} />
              </div>
              <CloseIcon className="remove-icon" />
            </div>
          </div>
          <div className="modal-avatar">
            <div className="camera-icon">
              <CameraIcon />
              <input type="file" name="avatar" id="image" onChange={handleUploadAvatar} />
            </div>
            <img width={100} height={100} src={tmpImg.avatar} alt="" />
          </div>
        </UserInfoPicture>
        <UserInfoText>
          <Input
            label={"名稱"}
            value={name}
            // defaultValue={personalInfo.name}
            onChange={handleNameUpdate}
          />
          <Input
            label={"自我介紹"}
            value={introduction}
            // defaultValue={personalInfo.introduction}
            onChange={handleIntroductionUpdate}
          />
        </UserInfoText>
      </div>
    </ModalStyle>
  );
};
export default EditInfoModal;
