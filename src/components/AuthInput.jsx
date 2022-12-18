import React from "react";
import styled from "styled-components";
import clsx from "clsx";

//原本想寫在input.styled.js的，但好像也沒有更多樣式了就放這吧
export const DefaultInputStyled = styled.div`
  position: relative;
  margin-bottom: 12px;

  input {
    box-sizing: border-box;
    height: 54px;
    width: 100%;
    color: var(--main_text);
    border: none;
    border-bottom: 2px solid var(--input-border_gray);
    background-color: var(--input-scale_light-gray);
    &[placeholder] {
      padding-left: 10px;
      padding-top: 24px;

      font-weight: 400;
      font-size: 16px;
      line-height: 26px;

      color: var(--input-placeholder_gray);
    }
    &:hover, &:focus {
      outline: 0;
      border-bottom-color: var(--main_primary);
    }

    &.error {
      border-bottom-color: var(--main_error);
    }

  }
  label {
    position: absolute;
    margin-left: 10px;

    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: var(--input-label_gray);
  }
  .error-msg {
    margin: 0; 

    text-align: left;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    color: var(--main_error);
  }
  
`;

const Input = ({ type, label, value, placeholder, onChange, errorMessage = "error message!" }) => {
  return (
    <DefaultInputStyled>
      <label>{label}</label>
      <input
        className={clsx('', {error: errorMessage !== null})}
        type={type || "text"}
        value={value || ""}
        placeholder={placeholder || ""}
        onChange={(e) => {
          onChange?.(e.target.value)
        }}
      />
      {errorMessage !== null && <p className="error-msg">{errorMessage}</p>}
    </DefaultInputStyled>
  );
};

export default Input;
