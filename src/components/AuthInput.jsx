import React from "react";
import styled from "styled-components";

const InputStyled = styled.div`
  position: relative;

  input {
    box-sizing: border-box;
    height: 54px;
    width: 595px;
    color: var(--main_text);
    border: none;
    border-bottom: 2px solid var(--input-border_gray);
    background-color: var(--input-scale_light-gray);
  }
  label {
    position: absolute;
    color: var(--input-label_gray);
  }
`;

const Input = ({ type, label, value, placeholder, onChange, errorMessage }) => {
  return (
    <InputStyled>
      <label>{label}</label>
      <input
        type={type || "text"}
        value={value || ""}
        placeholder={placeholder || ""}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />
      {errorMessage !== null && <p>{errorMessage}</p>}
    </InputStyled>
  );
};

export default Input;
