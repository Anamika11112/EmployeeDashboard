import React from "react";
import "./index.css";
function Input(props) {
  const {
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    autoComplete,
    label,
    className,
    required = false,
    ...rest
  } = props;
  return (
    <div className="input_container">
      {label && (
        <label className="input_label" htmlFor={name}>
          {label}
          {required && <span className="required_asterisk"> *</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={autoComplete}
        className={`inputField ${className}`}
        {...rest}
      />
    </div>
  );
}
export default Input;
