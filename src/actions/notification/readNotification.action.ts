import { AnyAction, Dispatch } from "redux";
import { AxiosError } from "axios";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";

const readNotificationAction = (publicId: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
        const res = await Axios.get(`${Api.notificationEndpoint}read/${publicId}`, config)
      dispatch({ type: Types.READ_NOTIFICATION_SUCCESS, payload: res.data });
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          dispatch(checkAuthenticatedAction(_getNotificationAction, publicId));
        }
      }
      dispatch({ type: Types.READ_NOTIFICATION_FAIL });
    }
  } else {
    dispatch({ type: Types.READ_NOTIFICATION_FAIL });
    dispatch({ type: Types.AUTHENTICATED_FAIL });
    dispatch({ type: Types.LOGOUT });
  }
};

const _getNotificationAction = (publicId: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      const res = await Axios.get(`${Api.notificationEndpoint}read/${publicId}`, config)
      dispatch({ type: Types.READ_NOTIFICATION_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: Types.READ_NOTIFICATION_FAIL });
    }
  } else {
    dispatch({ type: Types.READ_NOTIFICATION_FAIL });
  }
};

export default readNotificationAction;
