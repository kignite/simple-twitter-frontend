import React from "react";
import styled from "styled-components";
// import { adminDeleteUserTweet } from "../../api/getAdminRelated";

const CheckBoxStyled = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 200;
  height: 200px;
  width: 400px;
  border: 1px solid var(--main_orange);
  background-color: var(--main_white);
  border-radius: 15px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);

  .double-check {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 30px;
    color: var(--nav-unactive_gray);
  }

  .delete,
  .keep {
    border-radius: 10px;
    padding: 8px 30px;
    font-size: 20px;
    font-weight: 500;
    border-radius: 30px;
    color: var(--main_white);
    border: none;
    background-color: var(--main_orange);
    cursor: pointer;
    margin: 0 10px;
  }
  .keep {
    background-color: var(--main_success);
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
