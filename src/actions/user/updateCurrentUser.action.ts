import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/api";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "../auth/checkAuthenticated.action";
import { IAuthUserProfile } from "@/models";

const updateCurrentUserAction =
  (public_id: string, data: any) => async (dispatch: AnyAction | any) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access"),
          Accept: "application/json",
        },
      };

      const body = JSON.stringify(data);

      try {
        const res = await Axios.patch(`${Api.currentUserEndpoint + public_id}/`, body, config);
        dispatch({ type: Types.AUTHENTICATED_SUCCESS });
        dispatch({
          type: Types.GET_CURRENT_USER_LOADED_SUCCESS,
          payload: res.data,
        });
      } catch (error: any) {
        if (error.response.status === 401) {
          console.log(error)
          // dispatch(checkAuthenticatedAction(_updateCurrentUserAction, {public_id, data}));
        }
        dispatch({ type: Types.AUTHENTICATED_FAIL });
        dispatch({ type: Types.GET_CURRENT_USER_LOADED_FAIL });
      }
    } else {
      dispatch({ type: Types.AUTHENTICATED_FAIL });
      dispatch({ type: Types.GET_CURRENT_USER_LOADED_FAIL });
    }
  };

const _updateCurrentUserAction =
  (param: any) => async (dispatch: Dispatch<AnyAction> | any) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access"),
          Accept: "application/json",
        },
      };

      const {public_id, data} = param;

      const body = JSON.stringify(data);

      try {
        const res = await Axios.patch(`${Api.currentUserEndpoint + public_id}/`, body, config);
        dispatch({
          type: Types.GET_CURRENT_USER_LOADED_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        dispatch({
          type: Types.GET_CURRENT_USER_LOADED_FAIL,
        });
      }
    } else {
      dispatch({
        type: Types.GET_CURRENT_USER_LOADED_FAIL,
      });
    }
  };

export default updateCurrentUserAction;
