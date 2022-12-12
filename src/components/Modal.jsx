import React from "react";
import styled from "styled-components";

const ModalStyle = styled.div`
  box-sizing: border-box;
  height: 610px;
  width: 638px;
  position: fixed;
  top: 56px;
  border-radius: 14px;
  /* background-color: red; */
  z-index: 200;
  background-color: var(--main_white);
`;

const Modal = ({ active, setActive }) => {
  const handleClick = () => {
    setActive(false);
  };
  return active ? (
    <ModalStyle>
      <div className="test">789</div>
      <button onClick={handleClick}>submit</button>
    </ModalStyle>
  ) : null;
};
export default Modal;
