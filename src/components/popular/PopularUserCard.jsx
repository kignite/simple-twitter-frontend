import React from "react";
import styled from "styled-components";

const StyledItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 16px;

  .user-name {
    font-size: 16px;
    font-weight: 700;

    color: var(--main_text);
  }

  .user-account {
    font-size: 14px;
    font-size: 500;

    color: var(--account_text-in-pop);
  }
`;

const StyledAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;

  background-color: var(--avatar-scale_gray);
`;

const StyledButton = styled.button`
  padding: 8px 16px;
  border-radius: 50px;

  color: var(--main_white);
  background-color: var(--main_orange);
`;



const PopularUserCard = ({avatar, name, account}) => {
  return (
    <StyledItemContainer>
      <StyledAvatar src={avatar} alt="" />
      <div>
        <p className="user-name">{name}</p>
        <p className="user-account">@{account}</p>
      </div>
      <StyledButton>正在跟隨</StyledButton>
    </StyledItemContainer>
  );
};

export default PopularUserCard;