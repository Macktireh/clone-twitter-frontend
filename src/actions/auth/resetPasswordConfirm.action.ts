import axios from "axios";
import { AnyAction, Dispatch } from "redux";

import * as Types from "../types";

const resetPasswordConfirm =
  (uid: string, token: string, newPassword: string, reNewPassword: string) =>
  async (dispatch: Dispatch<AnyAction> | any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      password: newPassword,
      confirm_password: reNewPassword,
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/account/reset-password/${uid}/${token}/`,
        body,
        config
      );

      dispatch({
        type: Types.RESET_PASSWORD_CONFIRM_SUCCESS,
      });
      return { response: res.data, error: false };
    } catch (error: any) {
      dispatch({
        type: Types.RESET_PASSWORD_CONFIRM_FAIL,
      });
      return { response: error.response.data, error: true };
    }
  };

export default resetPasswordConfirm;
