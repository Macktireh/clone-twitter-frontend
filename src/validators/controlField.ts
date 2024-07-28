const detailPassword =
  "The password must contain at least 8 characters, at least one upper- and lower-case letter, one number and one special character.";
const detailConfirmPassword = "Passwords don't match";

const regexEmailValidator = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const regexPasswordValidator = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

export const blankValidator = (name: string, value: string) => {
  if (value === "" || value.length < 1 || value === " ") {
    return { validate: false, detail: `The ${name} field must not be empty` };
  }
  return { validate: true, detail: "OK" };
};

export const passwordValidator = (password: string, confirmPassword: string) => {
  if (!password.match(regexPasswordValidator)) {
    return { validate: false, detail: detailPassword };
  } else if (password !== confirmPassword) {
    return { validate: false, detail: detailConfirmPassword };
  }
  return { validate: true, detail: "OK" };
};

export const emailValidator = (email: string) => {
  if (!email.match(regexEmailValidator)) {
    return { validate: false, detail: "Please enter a valid email address." };
  }
  return { validate: true, detail: "OK" };
};
