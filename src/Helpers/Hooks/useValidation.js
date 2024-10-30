import { useState } from "react";
function useValidation() {
  const [errorMessage, setErrorMessage] = useState("");
  const registrationValidation = (username, password, confirmPassword) => {
    let valid = true;
    const usernameRegex = /^(?=.*\d)[a-zA-Z0-9]{5,}$/;
    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage("Please fill out all fields.");
      valid = false;
    } else if (localStorage.getItem(username)) {
      setErrorMessage("Username already taken. Choose another.");
      valid = false;
    } else if (!usernameRegex.test(username)) {
      setErrorMessage("Username requires 5+ characters (letters & numbers).");
      valid = false;
    } else if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be 8+ characters with at least one number."
      );
      valid = false;
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      valid = false;
    } else {
      setErrorMessage("");
    }
    return valid;
  };
  const employeeFormValidation = (name, designation, age, dob) => {
    let valid = true;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const numberRegex = /^\d+$/;
    const currentDate = new Date();
    const birthDate = new Date(dob);
    const ageDifference =currentDate.getFullYear() - birthDate.getFullYear();
    setErrorMessage("");
    if (!name) {
      setErrorMessage("Name is required");
      valid = false;
    } else if (!nameRegex.test(name)) {
      setErrorMessage("Name can only contain letters and spaces.");
      valid = false;
    } else if (!designation) {
      setErrorMessage("Designation is required");
      valid = false;
    } else if (!nameRegex.test(designation)) {
      setErrorMessage("Designation can only contain letters and spaces.");
      valid = false;
    } else if (!age) {
      setErrorMessage("Age is required");
      valid = false;
    } else if (!numberRegex.test(age) || age < 18 || age > 65) {
      setErrorMessage("Age must be a number between 18 and 65.");
      valid = false;
    } else if (!dob) {
      setErrorMessage("DOB is required");
      valid = false;
    } else if(ageDifference<18){
      setErrorMessage("You must be at least 18 years old.");
      valid = false;
    }else{
      return valid;
    }
  };
  return { registrationValidation, employeeFormValidation, errorMessage };
}
export default useValidation;
