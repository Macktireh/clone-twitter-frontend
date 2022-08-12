import Axios from "@/api";
import { AnyAction, Dispatch } from "redux";

import * as Types from "@/actions/types";

const accountActivationAction =
  (uidb64: string, token: string) => async (dispatch: Dispatch<AnyAction> | any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uidb64, token });

    try {
      const res = await Axios.post("/api/account/activate/", body, config);

      dispatch({
        type: Types.ACCOUNT_ACTIVATION_SUCCESS,
      });
      return { response: res.data, error: false };
    } catch (error: any) {
      dispatch({
        type: Types.ACCOUNT_ACTIVATION_FAIL,
      });
      return { response: error.response.data, error: true };
    }
  };

export default accountActivationAction;
