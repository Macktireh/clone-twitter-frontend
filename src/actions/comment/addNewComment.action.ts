import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
import { AxiosError } from "axios";
import { notifSocket } from "@/config/soket";
import { notification } from "@/context/NotificationProvider";

const addNewCommentAction =
  (postPublicId: string, data: FormData) => async (dispatch: Dispatch<AnyAction> | any) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      };

      try {
        const res = await Axios.post(`${Api.commentEndpoint + postPublicId}/`, data, config);
        dispatch({ type: Types.ADD_NEW_COMMENT_SUCCESS, payload: res.data });
        setTimeout(() => {
          let ws = notifSocket;
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(
              JSON.stringify({
                message: notification.addComment
              })
            );
          }
        }, 1000);
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          if (error.response.status === 401) {
            dispatch(checkAuthenticatedAction(_addNewCommentAction, { postPublicId, data }));
          }
        }
        dispatch({ type: Types.ADD_NEW_COMMENT_FAIL });
      }
    } else {
      dispatch({ type: Types.ADD_NEW_COMMENT_FAIL });
      dispatch({ type: Types.AUTHENTICATED_FAIL });
      dispatch({ type: Types.LOGOUT });
    }
  };

const _addNewCommentAction =
  (param: { postPublicId: string; data: FormData }) => async (dispatch: Dispatch<AnyAction> | any) => {
    const { postPublicId, data } = param;
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      };
      try {
        const res = await Axios.post(`${Api.commentEndpoint + postPublicId}/`, data, config);
        dispatch({ type: Types.ADD_NEW_COMMENT_SUCCESS, payload: res.data });
      } catch (error: any) {
        dispatch({ type: Types.ADD_NEW_COMMENT_FAIL });
      }
    } else {
      dispatch({ type: Types.ADD_NEW_COMMENT_FAIL });
    }
  };

export default addNewCommentAction;
