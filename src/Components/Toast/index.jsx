import React from "react";
import "./index.css";
const Toast = ({ message, type }) => {
  return <div className={`toast ${type}`}>{message}</div>;
};
export default Toast;
