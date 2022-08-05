const checkField = {
  validate: true,
  detail: "",
};

// export const DispyalErrorMessageField = (field=checkField, setDisplayError, setDetailError) => {
//   if (!field.validate) {
//     setDisplayError(true);
//     setDetailError(field.detail);
//   }
// }

export const DispyalErrorMessageFrontend = (
  setDisplayError: React.Dispatch<React.SetStateAction<boolean>>,
  setDetailError: React.Dispatch<React.SetStateAction<string>>,
  checkEmail = checkField,
  checkPassword = checkField,
  checkfirstName = checkField,
  checklastName = checkField
) => {
  try {
    // if (checkfirstName) {
    // console.log("firstValidator");
    if (!checkfirstName.validate) {
      setDisplayError(true);
      setDetailError(checkfirstName.detail);
    }
    // }
    // if (checklastName) {
    // console.log("lastValidator");
    else if (!checklastName.validate) {
      setDisplayError(true);
      setDetailError(checklastName.detail);
    }
    // }
    // if (checkEmail) {
    // console.log("emailValidator");
    else if (!checkEmail.validate) {
      setDisplayError(true);
      setDetailError(checkEmail.detail);
    }
    // }
    // if (checkPassword) {
    // console.log("passwordValidator");
    else if (!checkPassword.validate) {
      setDisplayError(true);
      setDetailError(checkPassword.detail);
    }
    // }
  } catch (error) {
    setDisplayError(true);
    setDetailError("Veuillez remplir correctement le formulaire.");
  }
};

export const DispyalErrorMessageBackend = (
  res: any,
  setDisplayError: React.Dispatch<React.SetStateAction<boolean>>,
  setDetailError: React.Dispatch<React.SetStateAction<string>>
) => {
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
    setDetailError("Veuillez remplir correctement le formulaire.");
  }
};
