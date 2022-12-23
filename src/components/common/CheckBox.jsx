import React from "react";
import styled from "styled-components";
// import { adminDeleteUserTweet } from "../../api/getAdminRelated";

const CheckBoxStyled = styled.div`
  display: block;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 200;
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
const CheckBox = ({ setCheckTweetId, tweetId, onDelete, setActive }) => {
  return (
    <CheckBoxStyled>
      <div className="double-check">是否刪除?</div>
      <div className="btn-area">
        <button
          className="keep"
          onClick={() => {
            setCheckTweetId(null);
            setActive(false);
          }}
        >
          保留
        </button>
        <button
          className="delete"
          onClick={() => {
            onDelete(tweetId);
            setActive(false);
          }}
        >
          刪除
        </button>
      </div>
    </CheckBoxStyled>
  );
};

export default CheckBox;
