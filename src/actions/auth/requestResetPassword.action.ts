import Axios from "@/api";
import { AnyAction, Dispatch } from "redux";

import * as Types from "@/actions/types";

const requestResetPasswordActiond = (email: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    const res = await Axios.post("/api/account/reset-password-send-email/", body, config);

    dispatch({
      type: Types.REQUEST_RESET_PASSWORD_SUCCESS,
    });
    return { response: res.data, error: false };
  } catch (error: any) {
    dispatch({
      type: Types.REQUEST_RESET_PASSWORD_FAIL,
    });
    return { response: error.response.data, error: true };
  }
};

export default requestResetPasswordActiond;
