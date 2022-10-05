import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/api";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
import { AxiosError } from "axios";

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
