const detailPassword =
  "Le mot de passe doit contenir au moins 8 caractères, au moins une lettre majuscule et minuscule, un chiffre et un caractère spécial.";
const detailConfirmPassword = "Les mots de passe ne correspondent pas";

const regexPasswordValidator =
  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
const regexEmailValidator = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const blankValidator = (name: string, value: string) => {
  if (value === "" || value.length < 1 || value === " ") {
    return { validate: false, detail: `Le champ ${name} ne doit pas être vide` };
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
    return { validate: false, detail: "Veuillez entrer une adresse email valide." };
  }
  return { validate: true, detail: "OK" };
};
