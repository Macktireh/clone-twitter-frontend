import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
import { AxiosError } from "axios";
import { notifSocket } from "@/config/soket";
import { notification } from "@/context/NotificationProvider";

const likeCommenttAction = (commentPublicId: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({ commentPublicId });
    try {
      const res = await Axios.post(Api.likeCommentEndpoint, body, config);
      dispatch({ type: Types.LIKE_OR_UNLIKE_COMMENT_SUCCESS, payload: res.data });
      setTimeout(() => {
        let ws = notifSocket;
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(
            JSON.stringify({
              message: notification.likeComment
            })
          );
        }
      }, 1000);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          dispatch(checkAuthenticatedAction(_likeCommenttAction, body));
        }
      }
      dispatch({ type: Types.LIKE_OR_UNLIKE_COMMENT_FAIL });
    }
  } else {
    dispatch({ type: Types.LIKE_OR_UNLIKE_COMMENT_FAIL });
    dispatch({ type: Types.AUTHENTICATED_FAIL });
    dispatch({ type: Types.LOGOUT });
  }
};

const _likeCommenttAction = (body: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      const res = await Axios.post(Api.likeCommentEndpoint, body, config);
      dispatch({ type: Types.LIKE_OR_UNLIKE_COMMENT_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: Types.LIKE_OR_UNLIKE_COMMENT_FAIL });
    }
  } else {
    dispatch({ type: Types.LIKE_OR_UNLIKE_COMMENT_FAIL });
  }
};

export default likeCommenttAction;
