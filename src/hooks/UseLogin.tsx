import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";

const useLogin = async (
  email: string,
  password: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setDisplayError: React.Dispatch<React.SetStateAction<boolean>>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setDetailError: React.Dispatch<React.SetStateAction<string>>,
  loginAction: (isAuthenticated?: boolean) => Promise<void>
) => {
  setLoading(true);
  setDisabled(true);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await Axios.post(Api.loginEndpoint, body, config);

    localStorage.setItem("access", res.data.token.access);
    localStorage.setItem("refresh", res.data.token.refresh);
    setDisplayError(false);
    loginAction(true);
  } catch (error: any) {
    setLoading(false);
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
