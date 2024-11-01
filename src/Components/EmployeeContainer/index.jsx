import React from "react";
import "./index.css";
import Button from "../Button";
function EmployeeContainer({
  employee,
  toggleModal,
  setEmpToEdit,
  setEmpToDelete,
}) {
  const handleUpdate = () => {
    toggleModal("editEmployeeModal", true);
    setEmpToEdit(employee);
  };
  const handleDelete = () => {
    toggleModal("deleteModal", true);
    setEmpToDelete(employee);
  }
  const { name, designation, age, dob, id } = employee;
  return (
    <div className="employee_container" key={id}>
      <div className="data_entry">
        <h2>{name}</h2>
        <h5>Age : {age}</h5>
        <h5>DOB : {dob}</h5>
      </div>
      <div className="designation">
        <h2>{designation}</h2>
      </div>
      <div className="emp_id">
        <h2>{id}</h2>
      </div>
      <div className="button_group ">
        <Button
          type="button"
          onClick={handleUpdate}
          className="tertiary_button"
        >
          Update
        </Button>
        <Button
          type="button"
          onClick={handleDelete}
          className="tertiary_button"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
export default EmployeeContainer;
