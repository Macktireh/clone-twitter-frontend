import Axios from "@/api";
import { AnyAction, Dispatch } from "redux";

import * as Types from "@/actions/types";
import loadUserAction from "@/actions/auth/loadUser.action";

const refreshToken = async (config: any, dispatch: Dispatch<AnyAction> | any) => {
  try {
    const body = JSON.stringify({
      refresh: localStorage.getItem("refresh"),
    });
    const res = await Axios.post("/api/account/token/refresh/", body, config);
    if (res.data.code !== "token_not_valid") {
      await localStorage.setItem("access", res.data.access);
      dispatch({ type: Types.REFRESH_TOKEN_SUCCESS });
      dispatch({ type: Types.AUTHENTICATED_SUCCESS });
      dispatch(loadUserAction());
    } else {
      dispatch({ type: Types.REFRESH_TOKEN_FAIL });
      dispatch({ type: Types.AUTHENTICATED_FAIL });
      dispatch({ type: Types.LOGIN_FAIL });
    }
  } catch (error) {
    dispatch({ type: Types.REFRESH_TOKEN_FAIL });
    dispatch({ type: Types.AUTHENTICATED_FAIL });
    dispatch({ type: Types.LOGIN_FAIL });
  }
};

const checkAuthenticatedAction = () => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await Axios.post("/api/account/jwt/verify/", body, config);
      if (res.data.code !== "token_not_valid") {
        dispatch({ type: Types.VERIFY_TOKEN_SUCCESS });
        dispatch({ type: Types.AUTHENTICATED_SUCCESS });
        dispatch(loadUserAction());
      } else {
        dispatch({ type: Types.VERIFY_TOKEN_FAIL });
        refreshToken(config, dispatch);
      }
    } catch (error) {
      dispatch({ type: Types.VERIFY_TOKEN_FAIL });
      refreshToken(config, dispatch);
    }
  } else {
    dispatch({ type: Types.AUTHENTICATED_FAIL });
    dispatch({ type: Types.LOGIN_FAIL });
  }
};

export default checkAuthenticatedAction;
