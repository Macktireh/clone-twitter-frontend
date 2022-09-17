import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/api";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "../auth/checkAuthenticated.action";

const getCurrentUserAction = () => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };

    try {
      const res = await Axios.get(Api.currentUserEndpoint, config);
      dispatch({ type: Types.AUTHENTICATED_SUCCESS });
      dispatch({
        type: Types.GET_CURRENT_USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(checkAuthenticatedAction(_getCurrentUserAction));
      }
      dispatch({ type: Types.AUTHENTICATED_FAIL });
      dispatch({type: Types.GET_CURRENT_USER_LOADED_FAIL,});
    }
  } else {
    dispatch({ type: Types.AUTHENTICATED_FAIL });
    dispatch({type: Types.GET_CURRENT_USER_LOADED_FAIL,});
  }
};

const _getCurrentUserAction = () => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };

    try {
      const res = await Axios.get(Api.currentUserEndpoint, config);
      dispatch({
        type: Types.GET_CURRENT_USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: Types.GET_CURRENT_USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: Types.GET_CURRENT_USER_LOADED_FAIL,
    });
  }
};

export default getCurrentUserAction;
