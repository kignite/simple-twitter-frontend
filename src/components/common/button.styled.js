import styled from "styled-components";

export const StyledButton = styled.button`
  box-sizing: border-box;
  padding: 8px 16px;
  border-radius: 50px;
  border: 1px solid var(--main_orange);

  font-size: 16px;
  font-weight: 400;

  color: var(--main_orange);
  background-color: var(--main_white);
  cursor: pointer;

  &.active {
    color: var(--main_white);
    background-color: var(--main_orange);
  }
`;

export const StyledBigButton = styled.button`
  width: 100%;
  padding: 8px 0;
  border-radius: 50px;
  border: none;

  font-size: 20px;
  font-weight: 400;

  color: var(--main_white);
  background-color: var(--main_orange);
  cursor: pointer;
`;

export const StyledLinkText = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-decoration: underline;

  color: var(--main_primary);
`;