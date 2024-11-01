import React from "react";
import "./index.css";
function Button({ type, onClick, children, className }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`common_button ${className}`}
    >
      {children}
    </button>
  );
}
export default Button;
