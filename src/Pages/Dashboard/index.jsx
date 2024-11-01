import React, { useEffect, useState, useCallback } from "react";
import "./index.css";
import Button from "../../Components/Button";
import Modal from "../../Components/Modal";
import EmpForm from "../../Components/EmpFom";
import { fetchData } from "../../Helpers/Utils/api";
import EmployeeContainer from "../../Components/EmployeeContainer";
import ConfirmDelete from "../../Components/ConfirmDelete";
import Input from "../../Components/Input";
import { useToast } from "../../Context/ToastContext";
import Loader from "../../Components/Loader";
import ConfirmLogout from "../../Components/ConfirmLogout";
function Dashboard() {
  const { showToast } = useToast();
  const [dataArray, setdataArray] = useState([]);
  const [empToEdit, setEmpToEdit] = useState(null);
  const [empToDelete, setEmpToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const [modalVisibility, setModalvisibility] = useState({
    addEmployeeModal: false,
    deleteModal: false,
    editEmployeeModal: false,
    logoutModal:false,
  });
  const { addEmployeeModal, deleteModal, editEmployeeModal,logoutModal } = modalVisibility;
  const toggleModal = (modalName, isVisible) => {
    setModalvisibility((prevState) => ({
      ...prevState,
      [modalName]: isVisible,
    }));
  };
  const fetchEmployeeDetailes = useCallback(async () => {
    setLoaderVisibility(true);
    try {
      const data = await fetchData();
      if (data) {
        setdataArray(data);
        setLoaderVisibility(false);
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  }, []);
  useEffect(() => {
    fetchEmployeeDetailes();
  }, []);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const filteredEmployees = searchQuery
    ? dataArray?.filter((employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : dataArray;
  return (
    <div>
      <div className="dashboard_header">
        <h1>Employee Dashboard</h1>
        <div className="heading_button_container">
          <Input placeholder="Search Employee" onChange={handleSearchChange} />
          <Button type="button" onClick={() => toggleModal("logoutModal", true)} className="secondary_button">
            Logout
          </Button>
        </div>
      </div>
      <div className="employee_container_heading">
        <div className="personal_deatils ">
          <h2>Personal Details</h2>
        </div>
        <div className="designation">
          <h2>Designation</h2>
        </div>
        <div className="emp_id">
          <h2>EMPID</h2>
        </div>
        <div className="button_group-heading ">
          <Button
            type="button"
            onClick={() => toggleModal("addEmployeeModal", true)}
            className="secondary_button"
          >
            Add employee
          </Button>
        </div>
      </div>
      {loaderVisibility ? (
        <Loader />
      ) : filteredEmployees?.length > 0 ? (
        filteredEmployees.map((employee) => (
          <EmployeeContainer
            key={employee?.id}
            employee={employee}
            toggleModal={toggleModal}
            setEmpToEdit={setEmpToEdit}
            setEmpToDelete={setEmpToDelete}
          />
        ))
      ) : (
        searchQuery && (
          <h1 className="noEmployee_message">No employees found</h1>
        )
      )}

      {addEmployeeModal && (
        <Modal
          onClick={() => toggleModal("addEmployeeModal", false)}
          className="primary_modal"
        >
          <EmpForm
            fetchEmployeeDetailes={fetchEmployeeDetailes}
            toggleModal={toggleModal}
          />
        </Modal>
      )}
      {editEmployeeModal && empToEdit && (
        <Modal
          onClick={() => toggleModal("editEmployeeModal", false)}
          className="primary_modal"
        >
          <EmpForm
            toggleModal={toggleModal}
            editEmployeeModal={editEmployeeModal}
            empToEdit={empToEdit}
            fetchEmployeeDetailes={fetchEmployeeDetailes}
          />
        </Modal>
      )}
      {deleteModal && (
        <Modal
          onClick={() => toggleModal("deleteModal", false)}
          className="secondary_modal"
        >
          <ConfirmDelete
            toggleModal={toggleModal}
            empToDelete={empToDelete}
            fetchEmployeeDetailes={fetchEmployeeDetailes}
          />
        </Modal>
      )}
      {logoutModal && (
        <Modal
          onClick={() => toggleModal("logoutModal", false)}
          className="secondary_modal"
        >
          <ConfirmLogout
          toggleModal={toggleModal}/>
        </Modal>
      )}
    </div>
  );
}
export default Dashboard;
