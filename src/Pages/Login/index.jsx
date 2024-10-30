import React, { useEffect, useState } from "react";
import "./index.css";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { dynamicInputHandler } from "../../Helpers/Utils/utilityFunctions";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../Components/ErrorMessage";
import { useToast } from "../../Context/ToastContext";
function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { username, password } = credentials;
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/dashboard");
    }
  }, []);
  const handleLogin = (event) => {
    event.preventDefault();
    let user = JSON.parse(localStorage.getItem(username));
    if (user) {
      if (user.password === password) {
        localStorage.setItem("isLoggedIn", true);
        showToast("Login successful!", "success");
        navigate("/dashboard");
      } else {
        setErrorMessage("Incorrect Password");
      }
    } else {
      setErrorMessage("User not found");
    }
  };
  return (
    <div>
      <form className="loginForm" onSubmit={handleLogin}>
        <div className="login_container">
          <h1 className="heading">Login to your account</h1>
          <Input
            type="text"
            name="username"
            value={username}
            placeholder="Enter username..."
            onChange={(event) => {
              dynamicInputHandler(event, setCredentials);
            }}
            autoComplete="off"
            label="Username :"
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
          <Button type="Submit">Login </Button>
        </div>
        <div className="login_error">
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <p>
            Dont have an account{" "}
            <Link to="registration" className="link">
              Register..
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
export default Login;
