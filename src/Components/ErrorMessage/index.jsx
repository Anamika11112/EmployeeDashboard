import React from "react";
import "./index.css";
function ErrorMessage({ children }) {
  return (
    <div className="error_container">
      <span>{children}</span>
    </div>
  );
}
export default ErrorMessage;
