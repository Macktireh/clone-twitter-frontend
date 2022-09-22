import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/api";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "../auth/checkAuthenticated.action";

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
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(checkAuthenticatedAction(_addNewPostAction, data));
      }
      dispatch({ type: Types.ADD_NEW_POST_FAIL });
    }
  } else {
    dispatch({ type: Types.ADD_NEW_POST_FAIL });
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
    }
  } else {
    dispatch({ type: Types.ADD_NEW_POST_FAIL });
  }
};

export default addNewPostAction;
