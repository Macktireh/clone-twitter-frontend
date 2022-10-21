import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
import { AxiosError } from "axios";

const deleteCommentAction =
  (postPublicId: string, public_id: string) => async (dispatch: Dispatch<AnyAction> | any) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access"),
          Accept: "application/json",
        },
      };
      try {
        await Axios.delete(`${Api.commentEndpoint + postPublicId}/${public_id}/`, config);
        dispatch({ type: Types.DELETE_COMMENT_SUCCESS, payload: public_id });
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          if (error.response.status === 401) {
            dispatch(checkAuthenticatedAction(_deleteCommentAction, { postPublicId, public_id }));
          }
        }
        dispatch({ type: Types.DELETE_COMMENT_FAIL });
      }
    } else {
      dispatch({ type: Types.DELETE_COMMENT_FAIL });
      dispatch({ type: Types.AUTHENTICATED_FAIL });
      dispatch({ type: Types.LOGOUT });
    }
  };

const _deleteCommentAction =
  (param: { postPublicId: string; public_id: string }) => async (dispatch: Dispatch<AnyAction> | any) => {
    const { postPublicId, public_id } = param;
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access"),
          Accept: "application/json",
        },
      };
      try {
        await Axios.delete(`${Api.commentEndpoint + postPublicId}/${public_id}/`, config);
        dispatch({ type: Types.DELETE_COMMENT_SUCCESS, payload: public_id });
      } catch (error: any) {
        dispatch({ type: Types.DELETE_COMMENT_FAIL });
      }
    } else {
      dispatch({ type: Types.DELETE_COMMENT_FAIL });
    }
  };

export default deleteCommentAction;
