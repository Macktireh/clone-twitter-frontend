import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/apiEndPoint";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
import { AxiosError } from "axios";

const addNewPostAction = (data: FormData) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    };

    try {
      const res = await Axios.post(Api.postEndpoint, data, config);
      dispatch({ type: Types.ADD_NEW_POST_SUCCESS, payload: res.data });
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          dispatch(checkAuthenticatedAction(_addNewPostAction, data));
        }
      }
      dispatch({ type: Types.ADD_NEW_POST_FAIL });
      return await (error as any).response.data.errors;
    }
  } else {
    dispatch({ type: Types.ADD_NEW_POST_FAIL });
    dispatch({ type: Types.AUTHENTICATED_FAIL });
    dispatch({ type: Types.LOGOUT });
  }
};

const _addNewPostAction = (data: FormData) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    };
    try {
      const res = await Axios.post(Api.postEndpoint, data, config);
      dispatch({ type: Types.ADD_NEW_POST_SUCCESS, payload: res.data });
    } catch (error: any) {
      dispatch({ type: Types.ADD_NEW_POST_FAIL });
      return await (error as any).response.data.errors;
    }
  } else {
    dispatch({ type: Types.ADD_NEW_POST_FAIL });
  }
};

export default addNewPostAction;
