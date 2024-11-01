import React from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Helpers/Utils/utilityFunctions";
function ConfirmLogout({ toggleModal }) {
  const navigate = useNavigate();
  return (
    <div className="confirmation_container">
      <div className="confirmation_body">
        <h1>Logout Confirmation</h1>
        <p>Are you sure want to do logout..?</p>
      </div>
      <div className="confirmation_button_group">
        <Button
          type="button"
          onClick={() => toggleModal("logoutModal", false)}
          className="secondary_button"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => logout(toggleModal, navigate)}
          className="secondary_button"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
export default ConfirmLogout;
