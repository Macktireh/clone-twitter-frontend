import { AnyAction, Dispatch } from "redux";
import { AxiosError, AxiosResponse } from "axios";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";

const getNotificationAction = (seen: boolean = false) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      let res: AxiosResponse<any, any>
      if(!seen) {
        res = await Axios.get(Api.notificationEndpoint, config)
      } else {
        res = await Axios.get(Api.notificationSeenEndpoint, config)
      };
      dispatch({ type: Types.GET_NOTIFICATION_SUCCESS, payload: res.data });
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          dispatch(checkAuthenticatedAction(_getNotificationAction, seen));
        }
      }
      dispatch({ type: Types.GET_NOTIFICATION_FAIL });
    }
  } else {
    dispatch({ type: Types.GET_NOTIFICATION_FAIL });
    dispatch({ type: Types.AUTHENTICATED_FAIL });
    dispatch({ type: Types.LOGOUT });
  }
};

const _getNotificationAction = (seen: boolean = false) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      let res: AxiosResponse<any, any>
      if(!seen) {
        res = await Axios.get(Api.notificationEndpoint, config)
      } else {
        res = await Axios.get(Api.notificationSeenEndpoint, config)
      };
      dispatch({ type: Types.GET_NOTIFICATION_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: Types.GET_NOTIFICATION_FAIL });
    }
  } else {
    dispatch({ type: Types.GET_NOTIFICATION_FAIL });
  }
};

export default getNotificationAction;
