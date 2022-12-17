import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Input from "../AuthInput";
import { useState } from "react";
import { uploadUserInfo } from "../../api/getUserTweets";
// import { getUserInfo } from "../../api/getUserTweets";
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
      background-color: #888;
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

const EditInfoModal = ({ token, personalInfo, setPersonalInfo, onClose }) => {
  const [avatar, setAvatar] = useState();
  const [cover, setCover] = useState();
  const [tmpImg, setTmpImg] = useState({
    avatar: null,
    cover: null,
  });
  const testRef = useRef(null);

  const handleSave = async () => {
    const info = {
      ...personalInfo,
      avatar: avatar,
      cover: cover,
    };
    await uploadUserInfo({ token, info });
    console.log(info);
    onClose();
  };

  const handleDeletCover = () => {
    setTmpImg({ ...tmpImg, cover: null });
  };

  //上傳頭像
  const handleUploadAvatar = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];

    fileReader.onload = () => {
      setTmpImg({ ...tmpImg, avatar: fileReader.result });
    };
    fileReader.readAsDataURL(file);
    setAvatar(file);
    setPersonalInfo({ ...personalInfo, avatar: tmpImg.avatar });
  };

  //上傳封面圖
  const handleUploadCover = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];

    if (!file) {
      setTmpImg({ ...tmpImg, cover: testRef.current.src });
      return;
    }
    fileReader.onload = () => {
      setTmpImg({ ...tmpImg, cover: fileReader.result });
    };
    //當onload時取出照片的base64資料
    fileReader.readAsDataURL(file);
    setCover(file);
    setPersonalInfo({ ...personalInfo, cover: tmpImg.cover });
  };

  useEffect(() => {
    const getPersonalInfo = async () => {
      setTmpImg({ avatar: personalInfo.avatar, cover: personalInfo.cover });
    };
    getPersonalInfo();
  }, []);

  return (
    <ModalStyle>
      <div className="header">
        <CloseIcon className="close" onClick={onClose} />
        <h5>編輯個人資料</h5>
        <StyledButton className="save active" onClick={handleSave}>
          儲存
        </StyledButton>
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
              ref={testRef}
            />
            <div className="change-cover-actions">
              <label htmlFor="cover" className="camera-icon">
                <CameraIcon />
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  onChange={handleUploadCover}
                />
              </label>
              <CloseIcon className="remove-icon" onClick={handleDeletCover} />
            </div>
          </div>
          <div className="modal-avatar">
            <div className="img-box">
              <label htmlFor="avatar" className="camera-icon">
                <CameraIcon />
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={handleUploadAvatar}
                />
              </label>
              <img width={100} height={100} src={tmpImg.avatar} alt="" />
            </div>
          </div>
        </UserInfoPicture>
        <UserInfoText>
          <Input
            label={"名稱"}
            value={personalInfo.name}
            onChange={(name) => {
              const prev = { ...personalInfo };
              setPersonalInfo({ ...prev, name: name });
            }}
          />
          <Input
            label={"自我介紹"}
            value={personalInfo.introduction}
            onChange={(introduction) => {
              const prev = { ...personalInfo };
              setPersonalInfo({ ...prev, introduction: introduction });
            }}
          />
        </UserInfoText>
      </div>
    </ModalStyle>
  );
};
export default EditInfoModal;
