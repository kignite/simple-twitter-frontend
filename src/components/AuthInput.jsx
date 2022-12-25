import React from "react";
import styled from "styled-components";
import clsx from "clsx";

//原本想寫在input.styled.js的，但好像也沒有更多樣式了就放這吧
export const DefaultInputStyled = styled.div`
  position: relative;
  height: 74px;
  margin-bottom: 12px;

  input,
  textarea {
    box-sizing: border-box;
    height: 54px;
    width: 100%;

    font-weight: 400;
    font-size: 16px;
    line-height: 26px;

    color: var(--main_text);
    border: none;
    border-bottom: 2px solid var(--input-border_gray);
    background-color: var(--input-scale_light-gray);
    transition: 0.3s;

    &[placeholder] {
      padding-left: 10px;
      padding-top: 24px;
    }
    &:hover,
    &:focus {
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
  .hint {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    .error-msg {
      visibility: hidden;
      margin: 0;
      color: var(--main_error);
      &.show {
        visibility: visible;
      }
    }
    .text-num {
      color: var(--input-label_gray);
    }
  }
  .introduction {
    height: 147px;
    resize: none;
  }
`;

export const Input = ({
  type,
  label,
  value,
  placeholder,
  onChange,
  maxLength = 100,
  errorMessage = null,
}) => {
  return (
    <DefaultInputStyled>
      <label>{label}</label>
      <input
        className={clsx(" ", {
          error:
            errorMessage || (label === "名稱" && value && value.length > 50),
        })}
        type={type || "text"}
        value={value || ""}
        placeholder={placeholder || ""}
        maxLength={maxLength}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />
      <div className="hint">
        <p
          className={
            "error-msg" +
            clsx(" ", {
              show:
                errorMessage ||
                (label === "名稱" && value && value.length > 50),
            })
          }
        >
          {errorMessage ||
            (label === "名稱" && value && value.length > 50 && "名稱不可超過50字!")}
        </p>
        {value !== null && label === "名稱" && (
          <p className="text-num">{value.length}/50</p>
        )}
      </div>
    </DefaultInputStyled>
  );
};

export const Textarea = ({
  label,
  value,
  onChange,
  errorMessage = null,
  maxLength = 400,
}) => {
  return (
    <DefaultInputStyled>
      <label>{label}</label>
      <textarea
        className={"introduction" + clsx(" ", { error: value?.length > 160 })}
        name="introduction"
        id="introduction"
        rows="5"
        value={value || ""}
        placeholder="請輸入自我介紹"
        maxLength={maxLength}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      ></textarea>
      <div className="hint">
        <p className={"error-msg" + clsx(" ", { show: value?.length > 160 })}>
          {errorMessage || "字數不可超過160字!"}
        </p>
        {value !== null && <p className="text-num">{value.length}/160</p>}
      </div>
    </DefaultInputStyled>
  );
};
