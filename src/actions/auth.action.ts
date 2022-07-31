import axios from "axios";
import { AnyAction, Dispatch } from "redux";

import * as Types from "./types";

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
        } else {
          try {
            const body = JSON.stringify({
              token: sessionStorage.getItem("refresh"),
            });
            const res = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/account/token/refresh/`,
              body,
              config
            );
            if (res.data.code !== "token_not_valid") {
              await sessionStorage.setItem("access", res.data.access);
              dispatch({ type: Types.AUTHENTICATED_SUCCESS });
            } else dispatch({ type: Types.AUTHENTICATED_FAIL });
          } catch (error) {
            dispatch({ type: Types.AUTHENTICATED_FAIL });
          }
        }
      } catch (error) {
        dispatch({ type: Types.AUTHENTICATED_FAIL });
      }
    } else dispatch({ type: Types.AUTHENTICATED_FAIL });
  };

export const loadUser = () => async (dispatch: Dispatch<AnyAction> | any) => {
  if (sessionStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access"),
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/me/`,
        config
      );
      dispatch({
        type: Types.USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: Types.USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: Types.USER_LOADED_FAIL,
    });
  }
};

export const login =
  (isAuthenticated: boolean = false) =>
  async (dispatch: Dispatch<AnyAction> | any) => {
    if (isAuthenticated) {
      dispatch({
        type: Types.LOGIN_SUCCESS,
      });
      dispatch(loadUser());
    } else {
      dispatch({
        type: Types.LOGIN_FAIL,
      });
    }
  };

export const logout = () => async (dispatch: Dispatch<AnyAction> | any) =>
  dispatch({ type: Types.LOGOUT });
