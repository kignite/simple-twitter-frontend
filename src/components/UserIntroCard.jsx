import React from "react";
import styled from "styled-components";
import { StyledButton } from "../components/common/button.styled";
import clsx from "clsx";
import { Link } from "react-router-dom";

const StyledCardContainer = styled.div`
  display: flex;
  padding: 16px 0;
  border: 1px solid var(--border_gray);

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 24px;
    margin-right: 8px;
  }

  .right-side {
    width: 100%;
    .name-header {
      width: calc(100% - 30px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      a {
        width: 50%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .name {
      width: 100%;
      font-size: 16px;
      font-weight: 700;
      line-height: 26px;
      margin-right: 8px;
    }

    p {
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      margin-right: 24px;
      margin-top: 15px;
    }
  }
`;

const UserIntroCard = ({
  userId,
  avatar,
  name,
  introduction,
  isFollowed,
  onBtnClicked,
  isDisabled,
}) => {
  return (
    <StyledCardContainer>
      <Link to={`/layout/user/other/?id=${userId}`}>
        <img src={avatar} alt="" />
      </Link>
      <div className="right-side">
        <div className="name-header">
          <Link to={`/layout/user/other/?id=${userId}`}>
            <span className="name">{name}</span>
          </Link>

          <StyledButton
            className={"follow-btn" + clsx(" ", { active: isFollowed })}
            onClick={onBtnClicked}
            disabled={isDisabled}
          >
            {isFollowed ? "正在跟隨" : "跟隨"}
          </StyledButton>
        </div>
        <p>{introduction}</p>
      </div>
    </StyledCardContainer>
  );
};

export default UserIntroCard;
