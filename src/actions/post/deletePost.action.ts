import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
import { AxiosError } from "axios";
import { notifSocket } from "@/config/soket";
import { notification } from "@/context/NotificationProvider";

const deletePostAction = (public_id: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      await Axios.delete(`${Api.postEndpoint + public_id}/`, config);
      dispatch({ type: Types.DELETE_POST_SUCCESS, payload: public_id });
      setTimeout(() => {
        let ws = notifSocket;
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(
            JSON.stringify({
              message: notification.deletePost,
            })
          );
        }
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          dispatch(checkAuthenticatedAction(_deletePostAction, public_id));
        }
      }
      dispatch({ type: Types.DELETE_POST_FAIL });
    }
  } else {
    dispatch({ type: Types.DELETE_POST_FAIL });
    dispatch({ type: Types.AUTHENTICATED_FAIL });
    dispatch({ type: Types.LOGOUT });
  }
};

const _deletePostAction = (public_id: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      await Axios.delete(`${Api.postEndpoint + public_id}/`, config);
      dispatch({ type: Types.DELETE_POST_SUCCESS, payload: public_id });
    } catch (error: any) {
      dispatch({ type: Types.DELETE_POST_FAIL });
    }
  } else {
    dispatch({ type: Types.DELETE_POST_FAIL });
  }
};

export default deletePostAction;
