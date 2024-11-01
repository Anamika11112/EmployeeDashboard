import React from "react";
import "./index.css";
function Modal({children,onClick,className} ) {
  return (
    <div>
      <div className={className}>
        <div className="common_body">{children}</div>
      </div>
      <div className="overlay" onClick={onClick}></div>
    </div>
  );
}
export default Modal;
