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

  .header {
    display: flex;
    align-items: center;
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
  .modal-avatar {
    position: relative;
    .img-box {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 66px;
      img {
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        transform: translateY(50%);
        border-radius: 50%;
        border: 5px solid white;
      }
      .camera-icon {
        position: absolute;
        z-index: 5;
      }
    }
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
      align-items: center;
      justify-content: space-between;
      width: 15%;
      z-index: 2;
      .remove-icon {
        cursor: pointer;
        path {
          fill: var(--main_white);
        }
      }
    }
  }

  .camera-icon {
    cursor: pointer;
    input {
      display: none;
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
      <div className="header">
        <CloseIcon className="close" onClick={handleClose} />
        <h5>編輯個人資料</h5>
        <StyledButton className="save active" onClick={handleSave}>儲存</StyledButton>
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
            <div className="change-cover-actions">
              <label htmlFor="cover" className="camera-icon">
                <CameraIcon />
                <input type="file" name="cover" id="cover" onChange={handleUploadCover} />
              </label>
              <CloseIcon className="remove-icon" />
            </div>
          </div>
          <div className="modal-avatar">
            <div className="img-box">
              <label htmlFor="avatar" className="camera-icon">
                <CameraIcon />
                <input type="file" name="avatar" id="avatar" onChange={handleUploadAvatar} />
              </label>
              <img width={100} height={100} src={tmpImg.avatar} alt="" />
            </div>
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
