import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";

const logoutAction = (public_id: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({ public_id });
    try {
      await Axios.post(Api.logoutEndpoint, body, config);
      dispatch({ type: Types.LOGOUT });
      dispatch({ type: Types.GET_ALL_USERS_LOADED_FAIL });
      dispatch({ type: Types.GET_ALL_POST_FAIL });
    } catch (error: any) {
      dispatch({ type: Types.LOGOUT });
      dispatch({ type: Types.GET_ALL_USERS_LOADED_FAIL });
      dispatch({ type: Types.GET_ALL_POST_FAIL });
    }
  } else {
    dispatch({ type: Types.LOGOUT });
    dispatch({ type: Types.GET_ALL_USERS_LOADED_FAIL });
    dispatch({ type: Types.GET_ALL_POST_FAIL });
  }
};
export default logoutAction;
