import React from "react";

const Input = ({ type, label, value, placeholder }) => {
  return (
    <div className="container">
      <label>{label}</label>
      <input
        type={type || "text"}
        value={value}
        // value={value || ""}
        placeholder={placeholder || ""}
      />
    </div>
  );
};

export default Input;
