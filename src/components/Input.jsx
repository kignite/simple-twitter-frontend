import React from "react";

const Input = ({ type, label, value, placeholder, onChange }) => {
  return (
    <div className="container">
      <label>{label}</label>
      <input
        type={type || "text"}
        // value={value}
        value={value || ""}
        placeholder={placeholder || ""}
        onChange={(e) => {onChange?.(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
