import styled from "styled-components";

export const StyledTabbar = styled.div`
  display: flex;
  .user-action-tab {
    width: 130px;
    padding: 15px 0;
    border: none;
    border-bottom: 2px solid var(--border_gray);

    font-size: 15px;
    font-weight: 700;
    color: var(--tab-unactive_gray);
    background-color: transparent;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
      border-bottom-color: #FF8C40;
    }

    &.active {
      border-bottom-color: var(--main_orange);
      color: var(--main_orange);
    }
  }
`;