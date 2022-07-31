import axios from "axios";

const useLogin = async (
  email: string,
  password: string,
  setDisplayError: React.Dispatch<React.SetStateAction<boolean>>,
  login: (isAuthenticated?: boolean) => (dispatch: any) => Promise<void>
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/account/login/`,
      body,
      config
    );
    console.log(res.data.token);

    sessionStorage.setItem("access", res.data.token.access);
    sessionStorage.setItem("refresh", res.data.token.refresh);
    setDisplayError(false);
    login(true);
  } catch (error) {
    setDisplayError(true);
    login();
  }
};

export default useLogin;
