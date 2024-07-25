import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";
import loginAction from "./login.action";

const googleLoginAction =
  (code: any) =>
  async (dispatch: Dispatch<AnyAction> | any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ code });

    console.log("googleLoginAction body", body);

    try {
      const res = await Axios.post(Api.googleLoginEndpoint, body, config);

      localStorage.setItem("access", res.data.token.access);
      localStorage.setItem("refresh", res.data.token.refresh);

      dispatch(loginAction(true));

    } catch (error: any) {
      dispatch({
        type: Types.LOGIN_FAIL,
      });
    }
  };

export default googleLoginAction;
