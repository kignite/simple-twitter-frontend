import React from "react";
import styled from "styled-components";
import { CloseIcon } from "../../assets/icons";
import { StyledTextareaContainer } from "../../pages/HomePage";
import { StyledButton } from "./button.styled";
import { StyledCardContainer } from "./cards/TweetCard";

const StyledModalContainer = styled.div`
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  width: 634px;

  border-radius: 14px;
  background-color: var(--main_white);
  z-index: 200;

  header {
    border-bottom: 1px solid var(--border_gray);
    .close {
      margin: 20px;
    }
  }
`;

// const StyledModalTweet = styled.div`

// `;


const Modal = ({active, setActive, avatar, name, account, createdAt, description}) => {

  return active ? (
    <StyledModalContainer>
      <header>
        <CloseIcon className="close" onClick={() => setActive(false)} />
      </header>
      <StyledCardContainer modal={true}>
        <img src={avatar} alt={name} />
        <div className="right-side">
          <span className="name">{name}</span>
          <span className="account">@{account}</span>
          <span className="created-time"> · {createdAt}</span>
          <p>{description}</p>
        </div>
      </StyledCardContainer>
      <StyledTextareaContainer modal={true}>
        <img src={avatar} alt="你的頭像" />
        <textarea
          name=""
          id=""
          cols="50"
          rows="5"
          placeholder="有什麼新鮮事?"
        ></textarea>
        <StyledButton className="post-tweet active">推文</StyledButton>
      </StyledTextareaContainer>
    </StyledModalContainer>
  ) : null;
};

export default Modal;