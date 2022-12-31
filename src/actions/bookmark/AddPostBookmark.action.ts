import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
import { AxiosError } from "axios";

const addPostBookmark = (postPublicId: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({ postPublicId });
    try {
      const res = await Axios.post(Api.bookmarksEndpoint, body, config);
      dispatch({ type: Types.BOOKMARK_SUCCESS, payload: res.data });
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          dispatch(checkAuthenticatedAction(_addPostBookmark, body));
        }
      }
      dispatch({ type: Types.BOOKMARK_FAIL });
    }
  } else {
    dispatch({ type: Types.BOOKMARK_FAIL });
    dispatch({ type: Types.AUTHENTICATED_FAIL });
    dispatch({ type: Types.LOGOUT });
  }
};

const _addPostBookmark = (body: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      const res = await Axios.post(Api.bookmarksEndpoint, body, config);
      dispatch({ type: Types.BOOKMARK_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: Types.BOOKMARK_FAIL });
    }
  } else {
    dispatch({ type: Types.BOOKMARK_FAIL });
  }
};

export default addPostBookmark;
