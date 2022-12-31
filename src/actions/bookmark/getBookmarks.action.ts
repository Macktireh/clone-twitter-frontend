import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
import { AxiosError } from "axios";

const getBookmarks = () => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      const res = await Axios.get(Api.bookmarksEndpoint, config);
      dispatch({ type: Types.GET_BOOKMARKS_SUCCESS, payload: res.data });
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          dispatch(checkAuthenticatedAction(_getBookmarks));
        }
      }
      dispatch({ type: Types.GET_BOOKMARKS_FAIL });
    }
  } else {
    dispatch({ type: Types.GET_BOOKMARKS_FAIL });
    dispatch({ type: Types.AUTHENTICATED_FAIL });
    dispatch({ type: Types.LOGOUT });
  }
};

const _getBookmarks = () => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      const res = await Axios.get(Api.bookmarksEndpoint, config);
      dispatch({ type: Types.GET_BOOKMARKS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: Types.GET_BOOKMARKS_FAIL });
    }
  } else {
    dispatch({ type: Types.GET_BOOKMARKS_FAIL });
  }
};

export default getBookmarks;
