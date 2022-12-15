import React from "react";
import styled from "styled-components";
import { StyledButton } from "../common/button.styled";
import clsx from "clsx";

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
`;


const PopularUserCard = ({avatar, name, account, isFollowed}) => {
  return (
    <StyledItemContainer>
      <StyledAvatar src={avatar} alt="" />
      <div className="user">
        <p className="user-name">{name}</p>
        <p className="user-account">@{account}</p>
      </div>
      <StyledButton className={"follow-btn" + clsx(' ', {active: isFollowed})}>
        {isFollowed ? '正在跟隨' : '跟隨'}
      </StyledButton>
    </StyledItemContainer>
  );
};

export default PopularUserCard;