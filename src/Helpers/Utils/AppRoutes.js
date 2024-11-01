import React from "react";
import { Routes, Route } from "react-router-dom";
import NomatchRoute from "../../Components/NomatchRoute"
import Login from "../../Pages/Login";
import Registration from "../../Pages/Registration";
import Dashboard from "../../Pages/Dashboard";
import ProtectedRoute from "../../Components/ProtectedRoute";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NomatchRoute />} />
    </Routes>
  );
};
export default AppRoutes;

