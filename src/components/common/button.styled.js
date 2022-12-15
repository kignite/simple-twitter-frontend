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

