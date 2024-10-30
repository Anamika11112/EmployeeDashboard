import React, { useState, useEffect } from "react";
import "./index.css";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { dynamicInputHandler } from "../../Helpers/Utils/utilityFunctions";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../Components/ErrorMessage";
import useValidation from "../../Helpers/Hooks/useValidation.js";
import { useToast } from "../../Context/ToastContext";
function Registration() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/dashboard");
    }
  }, []);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { registrationValidation, errorMessage } = useValidation();
  const { username, password, confirmPassword } = credentials;
  const handleRegistration = (event) => {
    event.preventDefault();
    const isValid = registrationValidation(username, password, confirmPassword);
    if (isValid) {
      const employee = {
        id: Date.now(),
        username: username,
        password: password,
      };
      localStorage.setItem(username, JSON.stringify(employee));
      showToast("Registration successful! Please log in.", "success");
      navigate("/");
    }
  };
  return (
    <div>
      <form className="registrationForm" onSubmit={handleRegistration}>
        <div className="registration_container">
          <h1 className="heading">Register here...</h1>
          <Input
            type="text"
            name="username"
            value={username}
            placeholder="Enter username..."
            onChange={(event) => {
              dynamicInputHandler(event, setCredentials);
            }}
            label="Username  :"
            autoComplete="off"
            required
          />
          <Input
            type="password"
            name="password"
            value={password}
            placeholder="Enter Password..."
            onChange={(event) => {
              dynamicInputHandler(event, setCredentials);
            }}
            label="Password  :"
            autoComplete="off"
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password..."
            onChange={(event) => {
              dynamicInputHandler(event, setCredentials);
            }}
            label="Confirm Password  :"
            autoComplete="off"
            required
          />
          <Button type="Submit">Create Account </Button>
        </div>
        <div className="registration_error">
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <p>
            Already have an account?
            <Link to="/" className="link">
              Login...
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
export default Registration;
