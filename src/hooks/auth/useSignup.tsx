import React from "react";
import axios from "axios";

const useSignup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  setDisplayError: React.Dispatch<React.SetStateAction<boolean>>,
  signup: (isSignUpSuccess?: boolean) => (dispatch: any) => Promise<void>
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/account/signup/`,
      body,
      config
    );

    setDisplayError(false);
    signup(true);
  } catch (error) {
    // console.log(error);
    setDisplayError(true);
    signup();
  }
};

export default useSignup;
