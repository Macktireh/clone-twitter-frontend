import axios from "axios";
import { AnyAction, Dispatch } from "redux";

import * as Types from "../types";

const signup =
  (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) =>
  async (dispatch: Dispatch<AnyAction> | any) => {
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

      dispatch({
        type: Types.SIGNUP_SUCCESS,
      });

      return { response: res.data, SignUpSuccess: true };
    } catch (error: any) {
      dispatch({
        type: Types.SIGNUP_FAIL,
      });

      return { response: error.response.data, SignUpSuccess: false };
    }
  };

export default signup;
