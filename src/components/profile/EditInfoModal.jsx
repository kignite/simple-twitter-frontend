import React from "react";
import styled from "styled-components";
import { Input, Textarea } from "../AuthInput";
import { useState } from "react";
import { uploadUserInfo } from "../../api/getUserTweets";
// import { getUserInfo } from "../../api/getUserTweets";
import { CloseIcon, CameraIcon } from "../../assets/icons";
import { StyledButton } from "../common/button.styled";
import Swal from "sweetalert2";

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
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 16px;
      bottom: 0;
      transform: translateY(50%);

      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 5px solid white;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        filter: brightness(0.5);
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

      background-color: var(--main_secondary);
      filter: brightness(0.5);
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
  margin-top: 82px;
  padding: 0 16px 0 16px;
`;

const EditInfoModal = ({ token, personalInfo, setPersonalInfo, onClose }) => {
  const [avatar, setAvatar] = useState();
  const [cover, setCover] = useState();
  const [introduction, setIntroduction] = useState(personalInfo.introduction);
  const [name, setName] = useState(personalInfo.name);
  const [deleteCover, setDeleteCover] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [tmpImg, setTmpImg] = useState({
    avatar: personalInfo.avatar,
    cover: personalInfo.cover,
  });

  const handleSave = async () => {
    if (name.length === 0) {
      setErrorMessage({ ...errorMessage, name: "名稱不能為空白" });
      return;
    } else if (name.length > 50) {
      setErrorMessage({ ...errorMessage, name: "名稱不能超過50字" });
      return;
    } else if (introduction.length > 160) {
      setErrorMessage({ ...errorMessage, introduction: "自我介紹最多160字" });
      return;
    }

    if (!cover && !deleteCover) {
      const info = {
        ...personalInfo,
        name: name,
        introduction: introduction,
        avatar: avatar,
      };

      console.log(info);
      await uploadUserInfo({ token, info });
      Swal.fire({
        position: "top",
        title: "設定成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });

      onClose();
      return;
    }

    const info = {
      ...personalInfo,
      name: name,
      introduction: introduction,
      avatar: avatar,
      cover: cover,
    };

    console.log(info);
    await uploadUserInfo({ token, info });
    Swal.fire({
      position: "top",
      title: "設定成功！",
      timer: 1000,
      icon: "success",
      showConfirmButton: false,
    });

    onClose();
  };

  const handleDeletCover = () => {
    setDeleteCover(true);
    setTmpImg({ ...tmpImg, cover: "https://i.imgur.com/bW0IDLD.png" });
  };

  //上傳頭像
  const handleUploadAvatar = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    const fileMaxSize = 1024;
    const fileSize = file.size / fileMaxSize;

    if (fileSize > fileMaxSize) {
      Swal.fire({
        position: "top",
        title: "檔案大小勿超過1M！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      return;
    }

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
    const fileMaxSize = 1024;
    const fileSize = file.size / fileMaxSize;

    if (fileSize > fileMaxSize) {
      Swal.fire({
        position: "top",
        title: "檔案大小勿超過1M！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
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
              <img src={tmpImg.avatar} alt="" />
            </div>
          </div>
        </UserInfoPicture>
        <UserInfoText>
          <Input
            label={"名稱"}
            value={name}
            errorMessage={errorMessage.name || null}
            onChange={(name) => {
              setName(name);
              setErrorMessage({ ...errorMessage, name: "" });
            }}
          />
          <Textarea
            label={"自我介紹"}
            value={introduction}
            errorMessage={errorMessage.introduction || null}
            onChange={(introduction) => {
              setIntroduction(introduction);
              setErrorMessage({ ...errorMessage, introduction: "" });
            }}
          />
        </UserInfoText>
      </div>
    </ModalStyle>
  );
};
export default EditInfoModal;
