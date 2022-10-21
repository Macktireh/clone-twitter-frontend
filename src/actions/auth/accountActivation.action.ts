import { AnyAction, Dispatch } from "redux";
import { AxiosError, AxiosResponse } from "axios";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";

const accountActivationAction = (uidb64: string, token: string) => async (dispatch: Dispatch<AnyAction>) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ uidb64, token });

  try {
    const res: AxiosResponse = await Axios.post(Api.accountActivationEndpoint, body, config);

    dispatch({
      type: Types.ACCOUNT_ACTIVATION_SUCCESS,
    });
    return { response: res.data, error: false };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      dispatch({
        type: Types.ACCOUNT_ACTIVATION_FAIL,
      });
      if (error.response) return { response: error.response.data, error: true };
    }
  }
};

export default accountActivationAction;
