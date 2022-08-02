const detailPassword =
  "Le Mot de passe doit contenir au moins minimum 8 caractères, au moins une lettre majuscule et minuscule, un chiffre et un caractère spécial";
const detailConfirmPassword = "Les mots de passe ne correspondent pas";

const regexPasswordValidator =
  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
const regexEmailValidator = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const nameChecker = (name: string, value: string) => {
  if (value === "" || value.length < 1 || value === " ") {
    return {
      validate: false,
      detail: `Le champ ${name} ne doit pas être vide`,
    };
  }
  return { validate: true, detail: "OK" };
};

export const passwordChecker = (password: string, confirmPassword: string) => {
  if (!password.match(regexPasswordValidator)) {
    return { validate: false, detail: detailPassword };
  } else if (password !== confirmPassword) {
    return {
      validate: false,
      detail: detailConfirmPassword,
    };
  }
  return { validate: true, detail: "OK" };
};

export const emailChecker = (email: string) => {
  if (!email.match(regexEmailValidator)) {
    return { validate: false, detail: "L'email n'est pas valide" };
  }
  return { validate: true, detail: "OK" };
};
