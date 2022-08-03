type checkField = {
  validate: boolean;
  detail: string;
};

export const verifyErrorMessage = (
  res: any,
  setDisplayError: React.Dispatch<React.SetStateAction<boolean>>,
  setDetailError: React.Dispatch<React.SetStateAction<string>>,
  checkfirstName: checkField,
  checklastName: checkField,
  checkEmail: checkField,
  checkPassword: checkField
) => {
  if (!res.SignUpSuccess) {
    try {
      if (res.response.errors.firstName) {
        setDisplayError(true);
        setDetailError(res.response.errors.firstName[0]);
      } else if (res.response.errors.lastName) {
        setDisplayError(true);
        setDetailError(res.response.errors.lastName[0]);
      } else if (res.response.errors.email) {
        setDisplayError(true);
        setDetailError(res.response.errors.email[0]);
      } else if (res.response.errors.password) {
        setDisplayError(true);
        setDetailError(res.response.errors.password[0]);
      } else if (res.response.errors.non_field_errors) {
        setDisplayError(true);
        setDetailError(res.response.errors.non_field_errors[0]);
      } else {
        setDisplayError(true);
        setDetailError("Veuillez remplir correctement le formulaire.");
      }
    } catch (error) {
      setDisplayError(true);
      setDetailError("Veuillez remplir correctement les champs.");
    }
  } else {
    if (!checkfirstName.validate) {
      setDisplayError(true);
      setDetailError(checkfirstName.detail);
    } else if (!checklastName.validate) {
      setDisplayError(true);
      setDetailError(checklastName.detail);
    } else if (!checkEmail.validate) {
      setDisplayError(true);
      setDetailError(checkEmail.detail);
    } else if (!checkPassword.validate) {
      setDisplayError(true);
      setDetailError(checkPassword.detail);
    }
  }
};
