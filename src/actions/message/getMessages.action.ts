import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
import { AxiosError } from "axios";

const getMessages = (publicId: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      const res = await Axios.get(`${Api.messagesEndpoint}${publicId}/`, config);
      dispatch({ type: Types.GET_MESSAGE_SUCCESS, payload: res.data });
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          dispatch(checkAuthenticatedAction(_getMessages, publicId));
        }
      }
      dispatch({ type: Types.GET_MESSAGE_FAIL });
    }
  } else {
    dispatch({ type: Types.GET_MESSAGE_FAIL });
    dispatch({ type: Types.AUTHENTICATED_FAIL });
    dispatch({ type: Types.LOGOUT });
  }
};

const _getMessages = (publicId: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      const res = await Axios.get(`${Api.messagesEndpoint}${publicId}/`, config);
      dispatch({ type: Types.GET_MESSAGE_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: Types.GET_MESSAGE_FAIL });
    }
  } else {
    dispatch({ type: Types.GET_MESSAGE_FAIL });
  }
};

export default getMessages;
