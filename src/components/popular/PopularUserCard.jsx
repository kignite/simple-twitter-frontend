import React from "react";
import styled from "styled-components";
import { StyledButton } from "../common/button.styled";
import clsx from "clsx";
import { Link } from "react-router-dom";

const StyledItemContainer = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px;

  .user {
    width: 30%;
    margin-left: 8px;
  }

  .user-name {
    font-size: 16px;
    font-weight: 700;
    line-height: 26px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    color: var(--main_text);
  }

  .user-account {
    font-size: 14px;
    font-size: 500;
    line-height: 22px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    color: var(--account_text-in-pop);
  }

  .follow-btn {
    position: absolute;
    right: 16px;
  }
`;

const StyledAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;

  background-color: var(--avatar-scale_gray);
  background-image: url('https://i.imgur.com/HD4yT2V.png');
  object-fit: cover;
`;

const PopularUserCard = ({
  avatar,
  name,
  account,
  isFollowed,
  onBtnClicked,
  userId,
}) => {
  return (
    <StyledItemContainer>
      <Link to={`/layout/user/other/?id=${userId}`}>
        <StyledAvatar src={avatar} alt="" />
      </Link>

      <div className="user">
        <Link to={`/layout/user/other/?id=${userId}`}>
          <p className="user-name">{name}</p>
        </Link>
        <p className="user-account">@{account}</p>
      </div>
      <StyledButton
        className={"follow-btn" + clsx(" ", { active: isFollowed })}
        onClick={onBtnClicked}
      >
        {isFollowed ? "正在跟隨" : "跟隨"}
      </StyledButton>
    </StyledItemContainer>
  );
};

export default PopularUserCard;
