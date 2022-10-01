import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/api";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
import { AxiosError } from "axios";

const deleteCommentAction = (public_id: string) => async (dispatch: Dispatch<AnyAction> | any) => {
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
      dispatch({ type: Types.DELETE_COMMENT_SUCCESS, payload: public_id });
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          dispatch(checkAuthenticatedAction(_deleteCommentAction));
        }
      }
      dispatch({ type: Types.DELETE_COMMENT_FAIL });
    }
  } else {
    dispatch({ type: Types.DELETE_COMMENT_FAIL });
  }
};

const _deleteCommentAction = (public_id: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      await Axios.delete(`${Api.postEndpoint}/${public_id}/`, config);
      dispatch({ type: Types.DELETE_COMMENT_SUCCESS, payload: public_id });
    } catch (error: any) {
      dispatch({ type: Types.DELETE_COMMENT_FAIL });
    }
  } else {
    dispatch({ type: Types.DELETE_COMMENT_FAIL });
  }
};

export default deleteCommentAction;
