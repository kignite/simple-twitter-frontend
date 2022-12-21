import React from "react";
import styled from "styled-components";
import { StyledButton } from "../components/common/button.styled";
import clsx from "clsx";

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
    }
    .name {
      font-size: 16px;
      font-weight: 700;
      line-height: 26px;
      margin-right: 8px;
      color: var(--main_text);
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

const UserIntroCard = ({ avatar, name, introduction, isFollowed, onBtnClicked, isDisabled }) => {
  return (
    <StyledCardContainer>
      <img src={avatar} alt={name} />
      <div className="right-side">
        <div className="name-header">
          <span className="name">{name}</span>
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
