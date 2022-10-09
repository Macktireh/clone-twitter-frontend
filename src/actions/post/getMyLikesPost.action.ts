import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/api";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
import { AxiosError } from "axios";

const getMyLikesPostAction = () => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      const res = await Axios.get(Api.listPostsLikes, config);
      dispatch({ type: Types.GET_LIST_POSTS_LIKES_SUCCESS, payload: res.data });
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          dispatch(checkAuthenticatedAction(_getMyLikesPostAction));
        }
      }
      dispatch({ type: Types.GET_LIST_POSTS_LIKES_FAIL });
    }
  } else {
    dispatch({ type: Types.GET_LIST_POSTS_LIKES_FAIL });
  }
};

const _getMyLikesPostAction = () => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };
    try {
      const res = await Axios.get(Api.postEndpoint, config);
      dispatch({ type: Types.GET_LIST_POSTS_LIKES_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: Types.GET_LIST_POSTS_LIKES_FAIL });
    }
  } else {
    dispatch({ type: Types.GET_LIST_POSTS_LIKES_FAIL });
  }
};

export default getMyLikesPostAction;
