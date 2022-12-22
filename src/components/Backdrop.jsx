import React from "react";
import styled from "styled-components";

const BackdropStyle = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const Backdrop = ({ active, children }) => {
  return active ? <BackdropStyle>{children}</BackdropStyle> : null;
};

export default Backdrop;
