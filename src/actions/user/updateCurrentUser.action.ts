import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/api";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "../auth/checkAuthenticated.action";

const updateCurrentUserAction =
  (public_id: string, data: any, isPic: boolean = false) =>
  async (dispatch: AnyAction | any) => {
    if (localStorage.getItem("access")) {
      let config;
      let res;
      if (isPic) {
        config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access"),
          },
        };
      } else {
        config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access"),
            Accept: "application/json",
          },
        };
      }

      const body = JSON.stringify(data);

      try {
        if (!isPic) {
          res = await Axios.patch(`${Api.currentUserEndpoint + public_id}/`, body, config);
        } else {
          res = await Axios.patch(`${Api.currentUserEndpoint + public_id}/`, data, config);
        }
        // console.log("updateCurrentUserAction OK", res);
        dispatch({
          type: Types.UPDATE_PROFILE_CURRENT_USER_LOADED_SUCCESS,
          payload: res.data,
        });
      } catch (error: any) {
        // console.log("updateCurrentUserAction error", error);
        if (error.response.status === 401) {
          if (!isPic) {
            dispatch(checkAuthenticatedAction(_updateCurrentUserAction, { public_id, data: body }));
          } else {
            dispatch(checkAuthenticatedAction(_updateCurrentUserAction, { public_id, data }));
          }
          
        }
        dispatch({ type: Types.UPDATE_PROFILE_CURRENT_USER_LOADED_FAIL });
      }
    } else {
      dispatch({ type: Types.AUTHENTICATED_FAIL });
      dispatch({ type: Types.UPDATE_PROFILE_CURRENT_USER_LOADED_FAIL });
    }
  };

const _updateCurrentUserAction = (param: any) => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };

    try {
      const res = await Axios.patch(`${Api.currentUserEndpoint + param.public_id}/`, param.data, config);
      // console.log("_updateCurrentUserAction OK", res);
      dispatch({
        type: Types.UPDATE_PROFILE_CURRENT_USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      // console.log("_updateCurrentUserAction error", error);
      dispatch({
        type: Types.UPDATE_PROFILE_CURRENT_USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: Types.UPDATE_PROFILE_CURRENT_USER_LOADED_FAIL,
    });
  }
};

export default updateCurrentUserAction;
