import React from "react";

const Input = ({
  type,
  label,
  value,
  placeholder,
  onChange,
  errorMessage,
}) => {
  return (
    <div className="container">
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
    </div>
  );
};

export default Input;
