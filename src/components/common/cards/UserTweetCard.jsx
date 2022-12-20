import React from "react";
import styled from "styled-components";
import { CloseIcon } from "../../../assets/icons";

const TweetCardStyled = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 0;
  border-bottom: 1px solid var(--border_gray);
  .right-side {
    width: 100%;
  }

  .avatar {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 8px;
    margin-left: 24px;
  }
  .tweet-head {
    width: calc(100% - 32px);
    display: flex;
    justify-content: space-between;
    padding: 0 5px 8px 8px;
    .tweet-user-name {
      font-size: 16px;
      font-weight: 700;
      line-height: 26px;
      margin-right: 8px;
    }
    .tweet-user-account {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: var(--account_text-in-main);
    }
    .delete-icon {
      path {
        fill: var(--admin-delete-icon_gray);
      }
      cursor: pointer;
    }

    .delete {
      cursor: not-allowed;
    }
  }
  .tweet-content {
    padding: 0 30px 0 8px;
  }
`;

const UserTweetCard = ({
  avatar,
  name,
  account,
  createdAt,
  id,
  onDelete,
  description,

}) => {
  return (
    <TweetCardStyled>
      <img width="50" src={avatar} alt="XX" className="avatar" />
      <div className="right-side">
        <div className="tweet-head">
          <div className="tweet-user-info">
            <span className="tweet-user-name">{name}</span>
            <span className="tweet-user-account">
              @{account} · {createdAt}
            </span>
          </div>
          <CloseIcon
            className={`delete-icon`}
            data-id={id}
            onClick={onDelete}
          />
        </div>
        <p className="tweet-content">{description}</p>
      </div>
    </TweetCardStyled>
  );
};

export default UserTweetCard;
