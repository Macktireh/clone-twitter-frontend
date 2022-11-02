import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
import { AxiosError } from "axios";

const updateCommentAction =
  (postPublicId: string, public_id: string, data: FormData) =>
  async (dispatch: Dispatch<AnyAction> | any) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      };

      try {
        const res = await Axios.patch(`${Api.commentEndpoint + postPublicId}/${public_id}/`, data, config);
        dispatch({ type: Types.UPDATE_COMMENT_SUCCESS, payload: res.data });
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          if (error.response.status === 401) {
            dispatch(checkAuthenticatedAction(_updateCommentAction, { postPublicId, public_id, data }));
          }
        }
        dispatch({ type: Types.UPDATE_COMMENT_FAIL });
      }
    } else {
      dispatch({ type: Types.UPDATE_COMMENT_FAIL });
      dispatch({ type: Types.AUTHENTICATED_FAIL });
      dispatch({ type: Types.LOGOUT });
    }
  };

const _updateCommentAction =
  (param: { postPublicId: string; public_id: string; data: FormData }) =>
  async (dispatch: Dispatch<AnyAction> | any) => {
    const { postPublicId, public_id, data } = param;
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      };

      try {
        const res = await Axios.patch(`${Api.commentEndpoint + postPublicId}/${public_id}/`, data, config);
        dispatch({ type: Types.UPDATE_COMMENT_SUCCESS, payload: res.data });
      } catch (error) {
        dispatch({ type: Types.UPDATE_COMMENT_FAIL });
      }
    } else {
      dispatch({ type: Types.UPDATE_COMMENT_FAIL });
    }
  };

export default updateCommentAction;
