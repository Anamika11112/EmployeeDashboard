import React, { useEffect, useState } from "react";
import Input from "../../Components/Input";
import Button from "../Button";
import "./index.css";
import { dynamicInputHandler } from "../../Helpers/Utils/utilityFunctions";
import useValidation from "../../Helpers/Hooks/useValidation.js";
import ErrorMessage from "../../Components/ErrorMessage";
import { addData, updateData } from "../../Helpers/Utils/api.js";
import { useToast } from "../../Context/ToastContext.js";
function EmpForm({
  toggleModal,
  setdataArray,
  fetchEmployeeDetailes,
  editEmployeeModal,
  empToEdit,
}) {
  const [employee, setEmployeeDetails] = useState({
    id: "",
    createdAt: "",
    name: "",
    designation: "",
    age: "",
    dob: "",
  });
  const { showToast } = useToast();
  const { name, designation, age, dob } = employee;
  useEffect(() => {
    if (empToEdit && editEmployeeModal) {
      setEmployeeDetails(empToEdit);
    }
  }, [empToEdit, editEmployeeModal]);
  const { employeeFormValidation, errorMessage } = useValidation();
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const isValid = employeeFormValidation(name, designation, Number(age), dob);
    if (isValid) {
      const currentDate = new Date();
      const currentTime = currentDate.toLocaleString();
      setEmployeeDetails({
        createdAt: currentTime,
        name: name,
        designation: designation,
        age: age,
        dob: dob,
      });
      if (empToEdit && editEmployeeModal) {
        updateEmployee(employee);
      } else {
        addNewEmployee(employee);
      }
    }
  };
  const updateEmployee = async (employee) => {
    try {
      const editedEmployee = await updateData(employee);
      setdataArray((prev) =>
        prev.map((emp) => (emp.id === editedEmployee.id ? editedEmployee : emp))
      );
      fetchEmployeeDetailes();
      toggleModal("editEmployeeModal", false);
      showToast("Employee Details Updated", "success");
    } catch (error) {
      showToast(error.message, "error");
    }
  };
  const addNewEmployee = async (employee) => {
    try {
      const addedEmployee = await addData(employee);
      setdataArray((prev) => [...prev, addedEmployee]);
      fetchEmployeeDetailes();
      toggleModal("addEmployeeModal", false);
      showToast("Employee added successfully", "success");
    } catch (error) {
      showToast(error.message, "error");
    }
  };
  const handleModalCloseButton = () => {
    if (editEmployeeModal) {
      toggleModal("editEmployeeModal", false);
    } else {
      toggleModal("addEmployeeModal", false);
    }
  };
  return (
    <div className="form_container">
      <div className="form_heading">
        <h2>Employee Registration</h2>
        <Button
          type="button"
          onClick={handleModalCloseButton}
          className="modalClose"
        >
          &times;
        </Button>
      </div>
      <form className="employee_adding_form" onSubmit={handleFormSubmit}>
        <Input
          type="text"
          name="name"
          value={name}
          placeholder="Enter Name..."
          onChange={(event) => {
            dynamicInputHandler(event, setEmployeeDetails);
          }}
          label="Name :"
          autoComplete="off"
          required
        />
        <Input
          type="text"
          name="designation"
          value={designation}
          placeholder="Enter Designation..."
          onChange={(event) => {
            dynamicInputHandler(event, setEmployeeDetails);
          }}
          label="Designation :"
          autoComplete="off"
          required
        />
        <Input
          type="number"
          name="age"
          value={age}
          placeholder="Enter Age..."
          onChange={(event) => {
            dynamicInputHandler(event, setEmployeeDetails);
          }}
          label="Age :"
          autoComplete="off"
          required
        />
        <Input
          type="date"
          name="dob"
          value={dob}
          onChange={(event) => {
            dynamicInputHandler(event, setEmployeeDetails);
          }}
          label="DOB :"
          autoComplete="off"
          required
        />
        <Button type="submit">Submit</Button>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </form>
    </div>
  );
}
export default EmpForm;
