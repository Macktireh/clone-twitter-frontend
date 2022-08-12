import Axios from "@/api";

const useLogin = async (
  email: string,
  password: string,
  setDisplayError: React.Dispatch<React.SetStateAction<boolean>>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setDetailError: React.Dispatch<React.SetStateAction<string>>,
  loginAction: (isAuthenticated?: boolean) => (dispatch: any) => Promise<void>
) => {
  setDisabled(true);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await Axios.post( "/api/account/login/", body, config );

    sessionStorage.setItem("access", res.data.token.access);
    sessionStorage.setItem("refresh", res.data.token.refresh);
    setDisplayError(false);
    loginAction(true);
  } catch (error: any) {
    // console.log(error);
    setDisabled(false);
    setDisplayError(true);
    if (
      error.response.data.errors === "L'email ou le mot de passe n'est pas valide !" ||
      error.response.data.errors === "Veuillez confirmer votre adresse e-mail !"
    ) {
      setDetailError(error.response.data.errors);
    } else if (error.response.data.errors.email[0] === "Saisissez une adresse e-mail valide.") {
      setDetailError(error.response.data.errors.email[0]);
    } else setDetailError("L'email ou le mot de passe n'est pas valide !");
    loginAction();
  }
};

export default useLogin;
