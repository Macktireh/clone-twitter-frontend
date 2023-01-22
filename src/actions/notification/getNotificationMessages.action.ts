import { AnyAction, Dispatch } from "redux";
import { AxiosError, AxiosResponse } from "axios";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";

const getNotificationMessagesAction =
  (preview: boolean = false) =>
  async (dispatch: Dispatch<AnyAction> | any) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access"),
          Accept: "application/json",
        },
      };
      try {
        let res: AxiosResponse<any, any>;
        if (!preview) {
          res = await Axios.get(Api.noficationMessagesEndpoint, config);
        } else {
          res = await Axios.post(Api.noficationMessagesEndpoint, config);
        }
        dispatch({ type: Types.PREVIEW_NOTIFICATION_MESSAGES_SUCCESS, payload: res.data });
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          if (error.response.status === 401) {
            dispatch(checkAuthenticatedAction(_getNotificationMessagesAction, preview));
          }
        }
        dispatch({ type: Types.PREVIEW_NOTIFICATION_MESSAGES_FAIL });
      }
    } else {
      dispatch({ type: Types.PREVIEW_NOTIFICATION_MESSAGES_FAIL });
      dispatch({ type: Types.AUTHENTICATED_FAIL });
      dispatch({ type: Types.LOGOUT });
    }
  };

const _getNotificationMessagesAction =
  (preview: boolean = false) =>
  async (dispatch: Dispatch<AnyAction> | any) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access"),
          Accept: "application/json",
        },
      };
      try {
        let res: AxiosResponse<any, any>;
        if (!preview) {
          res = await Axios.get(Api.noficationMessagesEndpoint, config);
        } else {
          res = await Axios.post(Api.noficationMessagesEndpoint, config);
        }
        dispatch({ type: Types.PREVIEW_NOTIFICATION_MESSAGES_SUCCESS, payload: res.data });
      } catch (error) {
        dispatch({ type: Types.PREVIEW_NOTIFICATION_MESSAGES_FAIL });
      }
    } else {
      dispatch({ type: Types.PREVIEW_NOTIFICATION_MESSAGES_FAIL });
    }
  };

export default getNotificationMessagesAction;
