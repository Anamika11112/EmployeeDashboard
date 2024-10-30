import React from "react";
import Button from "../Button";
import "./index.css";
import { deleteData } from "../../Helpers/Utils/api";
import { useToast } from "../../Context/ToastContext";
function ConfirmDelete({ toggleModal, empToDelete, fetchEmployeeDetailes }) {
  const { showToast } = useToast();
  const handleDelete = async () => {
    try {
      const deletedEmployee = await deleteData(empToDelete);
      if (deletedEmployee) {
        fetchEmployeeDetailes();
        toggleModal("deleteModal", false);
        showToast("Employee Deleted successfully", "success");
      }
    } catch (error) {
      showToast(error.message, "error");
      toggleModal("deleteModal", false);
    }
  };
  return (
    <div className="confirmation_container">
      <div className="confirmation_body">
        <h1>Are You Sure ?</h1>
        <p>
          This action cannot be undone. All data associated with this employee
          will be lost..!
        </p>
      </div>
      <div className="confirmation_button_group">
        <Button
          type="button"
          onClick={() => toggleModal("deleteModal", false)}
          className="secondary_button"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleDelete}
          className="secondary_button"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
export default ConfirmDelete;
