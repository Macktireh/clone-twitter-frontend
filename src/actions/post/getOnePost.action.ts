import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/api";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
import { AxiosError } from "axios";

const getOnePostAction = (publicId: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      const res = await Axios.get(`${Api.postEndpoint + publicId}/`, config);
      dispatch({ type: Types.GET_ONE_POST_SUCCESS, payload: res.data });
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          dispatch(checkAuthenticatedAction(_getOnePostAction));
        }
      }
      dispatch({ type: Types.GET_ONE_POST_FAIL });
    }
  } else {
    dispatch({ type: Types.GET_ONE_POST_FAIL });
  }
};

const _getOnePostAction = (publicId: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      const res = await Axios.get(`${Api.postEndpoint + publicId}/`, config);
      dispatch({ type: Types.GET_ONE_POST_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: Types.GET_ONE_POST_FAIL });
    }
  } else {
    dispatch({ type: Types.GET_ONE_POST_FAIL });
  }
};

export default getOnePostAction;
