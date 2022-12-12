import React from "react";
import styled from "styled-components";

const BackdropStyle = styled.div`
  background-color: var(--main_secondary);
  opacity: 0.5;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const Backdrop = ({ active }) => {
  return active ? <BackdropStyle></BackdropStyle> : null;
};

export default Backdrop;
