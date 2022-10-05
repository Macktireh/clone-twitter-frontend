import { AnyAction, Dispatch } from "redux";
import { AxiosError } from "axios";

import Axios from "@/config/axios";
import * as Api from "@/config/api";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";

const getAllCommentAction = (postPublicId: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      const res = await Axios.get(`${Api.commentEndpoint + postPublicId}/`, config);
      dispatch({ type: Types.GET_ALL_COMMENT_SUCCESS, payload: res.data });
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          dispatch(checkAuthenticatedAction(_getAllCommentAction, postPublicId));
        }
      }
      dispatch({ type: Types.GET_ALL_COMMENT_FAIL });
    }
  } else {
    dispatch({ type: Types.GET_ALL_COMMENT_FAIL });
  }
};

const _getAllCommentAction = (postPublicId: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      const res = await Axios.get(`${Api.commentEndpoint + postPublicId}/`, config);
      dispatch({ type: Types.GET_ALL_COMMENT_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: Types.GET_ALL_COMMENT_FAIL });
    }
  } else {
    dispatch({ type: Types.GET_ALL_COMMENT_FAIL });
  }
};

export default getAllCommentAction;
