import { AnyAction, Dispatch } from "redux";
import { AxiosError } from "axios";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";

const addFollowingAction = (followingPubblicId: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ followingPubblicId })

    try {
      const res = await Axios.post(Api.followingEndpoint, body, config);
      dispatch({ type: Types.ADD_FOLLOWING_SUCCESS, payload: res.data });
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          dispatch(checkAuthenticatedAction(_addFollowingAction, body));
        }
      }
      dispatch({ type: Types.ADD_FOLLOWING_FAIL });
    }
  } else {
    dispatch({ type: Types.ADD_FOLLOWING_FAIL });
    dispatch({ type: Types.AUTHENTICATED_FAIL });
    dispatch({ type: Types.LOGOUT });
  }
};

const _addFollowingAction = (body: string) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };

    try {
      const res = await Axios.post(Api.followingEndpoint, body, config);
      dispatch({ type: Types.ADD_FOLLOWING_SUCCESS, payload: res.data });
    } catch (error: unknown) {
      dispatch({ type: Types.ADD_FOLLOWING_FAIL });
    }
  } else {
    dispatch({ type: Types.ADD_FOLLOWING_FAIL });
  }
};

export default addFollowingAction;
