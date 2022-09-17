import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/api";
import * as Types from "@/actions/types";

const resetPasswordAction =
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
      const res = await Axios.post(`${Api.resetPasswordEndpoint + uid}/${token}/`, body, config);

      dispatch({
        type: Types.RESET_PASSWORD_SUCCESS,
      });
      return { response: res.data, error: false };
    } catch (error: any) {
      dispatch({
        type: Types.RESET_PASSWORD_FAIL,
      });
      return { response: error.response.data, error: true };
    }
  };

export default resetPasswordAction;
