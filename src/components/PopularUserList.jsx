import React from "react";
import styled from "styled-components";

const StyledListContainer = styled.div`
  width: 100%;
  border-radius: 16px;
  background-color: var(--scale_light-gray);

  h4 {
    color: var(--main_text);
    font-size: 24px;
    line-height: 26px;
    border-bottom: 1px solid var(--border_gray);
  }
`;

const PopularUserList = () => {
  return (
    <StyledListContainer>
      <h4>推薦追隨</h4>
    </StyledListContainer>
  );
};

export default PopularUserList;