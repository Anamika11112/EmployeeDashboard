import React, { createContext, useContext, useState } from "react";
import Toast from "../Components/Toast";
const ToastContext = createContext();
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: "", type: "" });
  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 6000);
  };
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.message && <Toast message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
};
export const useToast = () => {
  return useContext(ToastContext);
};
