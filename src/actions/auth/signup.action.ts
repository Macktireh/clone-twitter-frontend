import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";

const signupAction =
  (firstName: string, lastName: string, email: string, password: string, confirmPassword: string) =>
  async (dispatch: Dispatch<AnyAction> | any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ firstName, lastName, email, password, confirmPassword });

    try {
      const res = await Axios.post(Api.signupEndpoint, body, config);

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

export default signupAction;
