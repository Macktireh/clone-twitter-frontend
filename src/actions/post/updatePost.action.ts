import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/api";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
import { AxiosError } from "axios";

const updatePostAction =
  (public_id: string, data: FormData) => async (dispatch: Dispatch<AnyAction> | any) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      };

      try {
        const res = await Axios.patch(`${Api.postEndpoint + public_id}/`, data, config);
        dispatch({ type: Types.UPDATE_POST_SUCCESS, payload: res.data });
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          if (error.response.status === 401) {
            dispatch(checkAuthenticatedAction(_updatePostAction, { public_id, data }));
          }
        }
        dispatch({ type: Types.UPDATE_POST_FAIL });
      }
    } else {
      dispatch({ type: Types.UPDATE_POST_FAIL });
      dispatch({ type: Types.AUTHENTICATED_FAIL });
      dispatch({ type: Types.LOGOUT });
    }
  };

const _updatePostAction =
  (param: { public_id: string; data: FormData }) => async (dispatch: Dispatch<AnyAction> | any) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      };

      try {
        const res = await Axios.patch(`${Api.postEndpoint + param.public_id}/`, param.data, config);
        dispatch({ type: Types.UPDATE_POST_SUCCESS, payload: res.data });
      } catch (error) {
        dispatch({ type: Types.UPDATE_POST_FAIL });
      }
    } else {
      dispatch({ type: Types.UPDATE_POST_FAIL });
    }
  };

export default updatePostAction;
