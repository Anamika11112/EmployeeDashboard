export const dynamicInputHandler = (event, setState) => {
  const { name, value } = event.target;
  setState((prevState) => ({ ...prevState, [name]: value }));
};
export const logout = (toggleModal, navigate) => {
  toggleModal("logoutModal", true);
  localStorage.removeItem("isLoggedIn");
  navigate("/");
};
