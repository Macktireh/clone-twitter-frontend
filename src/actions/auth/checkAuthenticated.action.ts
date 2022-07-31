import axios from "axios";
import { AnyAction, Dispatch } from "redux";

import * as Types from "../types";
import { loadUser } from "./loadUser.action";

const refreshToken = async (
  config: any,
  dispatch: Dispatch<AnyAction> | any
) => {
  try {
    const body = JSON.stringify({
      refresh: sessionStorage.getItem("refresh"),
    });
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/account/token/refresh/`,
      body,
      config
    );
    if (res.data.code !== "token_not_valid") {
      await sessionStorage.setItem("access", res.data.access);
      dispatch({ type: Types.AUTHENTICATED_SUCCESS });
      dispatch(loadUser());
    } else {
      dispatch({ type: Types.AUTHENTICATED_FAIL });
      dispatch({ type: Types.LOGIN_FAIL });
    }
  } catch (error) {
    dispatch({ type: Types.AUTHENTICATED_FAIL });
    dispatch({ type: Types.LOGIN_FAIL });
  }
};

export const checkAuthenticated =
  () => async (dispatch: Dispatch<AnyAction> | any) => {
    if (sessionStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ token: sessionStorage.getItem("access") });

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/account/jwt/verify/`,
          body,
          config
        );
        if (res.data.code !== "token_not_valid") {
          dispatch({ type: Types.AUTHENTICATED_SUCCESS });
          dispatch(loadUser());
        } else {
          refreshToken(config, dispatch);
        }
      } catch (error) {
        refreshToken(config, dispatch);
      }
    } else {
      dispatch({ type: Types.AUTHENTICATED_FAIL });
      dispatch({ type: Types.LOGIN_FAIL });
    }
  };
