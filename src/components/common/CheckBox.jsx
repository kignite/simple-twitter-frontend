import React from "react";
import styled from "styled-components";
import { adminDeleteUserTweet } from "../../api/getAdminRelated";

const CheckBoxStyled = styled.div`
  display: block;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 250px;
  width: 500px;
  border: 1px solid var(--main_orange);
  background-color: var(--main_orange);
  border-radius: 8px;
  .double-check {
    font-size: 50px;
    margin-bottom: 20px;
  }

  .delete,
  .keep {
    border-radius: 8px;
    padding: 20px 50px;
    font-size: 50px;
    border: 1px solid var(--main_success);
    cursor: pointer;
    margin: 0 10px;
  }
`;
const CheckBox = ({ setCheckDelete, tweetId }) => {
  console.log(tweetId);
  const handleDelte = async () => {
    const token = localStorage.getItem("token");
    await adminDeleteUserTweet({ tweetId, token });
  };
  return (
    <CheckBoxStyled>
      <div className="double-check">是否刪除?</div>
      <div className="btn-area">
        <button className="delete" onClick={handleDelte}>
          保留
        </button>
        <button className="keep" onClick={() => setCheckDelete(false)}>
          刪除
        </button>
      </div>
    </CheckBoxStyled>
  );
};

export default CheckBox;
