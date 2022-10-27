import { AnyAction, Dispatch } from "redux";
import { AxiosError } from "axios";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";

const getAllFollowersAction = () => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };

    try {
      const res = await Axios.get(Api.followersEndpoint, config);
      dispatch({ type: Types.GET_ALL_FOLLOWERS_SUCCESS, payload: res.data });
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          dispatch(checkAuthenticatedAction(_getAllFollowersAction));
        }
      }
      dispatch({ type: Types.GET_ALL_FOLLOWERS_FAIL });
    }
  } else {
    dispatch({ type: Types.GET_ALL_FOLLOWERS_FAIL });
    dispatch({ type: Types.AUTHENTICATED_FAIL });
    dispatch({ type: Types.LOGOUT });
  }
};

const _getAllFollowersAction = () => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };

    try {
      const res = await Axios.get(Api.followersEndpoint, config);
      dispatch({ type: Types.GET_ALL_FOLLOWERS_SUCCESS, payload: res.data });
    } catch (error: unknown) {
      dispatch({ type: Types.GET_ALL_FOLLOWERS_FAIL });
    }
  } else {
    dispatch({ type: Types.GET_ALL_FOLLOWERS_FAIL });
  }
};

export default getAllFollowersAction;
