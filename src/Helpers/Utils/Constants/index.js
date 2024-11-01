const nameRegex = /^[a-zA-Z\s]+$/;
const numberRegex = /^\d+$/;
const usernameRegex = /^(?=.*\d)[a-zA-Z0-9]{5,}$/;
const passwordRegex = /^(?=.*\d).{8,}$/;
export { nameRegex, numberRegex, usernameRegex, passwordRegex };
