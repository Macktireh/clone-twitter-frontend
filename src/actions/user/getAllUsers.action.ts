import { AnyAction, Dispatch } from "redux";

import Axios from "@/config/axios";
import * as Api from "@/config/api";
import * as Types from "@/actions/types";
import checkAuthenticatedAction from "../auth/checkAuthenticated.action";


// const func = async (config: any, dispatch: Dispatch<AnyAction> | any) => {
//   try {
//     const res = await Axios.get(Api.allUserEndpoint, config);
//     dispatch({
//       type: Types.GET_ALL_USERS_LOADED_SUCCESS,
//       payload: res.data,
//     });
//     return {res, error: null}
//   } catch (error: any) {
//     dispatch({
//       type: Types.GET_ALL_USERS_LOADED_FAIL,
//     });
//     return {res: null, error}
//   }
// }

const getAllUsersAction = () => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };

    try {
      const res = await Axios.get(Api.allUserEndpoint, config);
      dispatch({
        type: Types.GET_ALL_USERS_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (error: any) {
      dispatch(checkAuthenticatedAction(_getAllUsersAction));
      dispatch({type: Types.GET_ALL_USERS_LOADED_FAIL,});
    }
  } else {
    dispatch({type: Types.GET_ALL_USERS_LOADED_FAIL,});
  }
};

const _getAllUsersAction = () => async (dispatch: Dispatch<AnyAction> | any) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
        Accept: "application/json",
      },
    };

    try {
      const res = await Axios.get(Api.allUserEndpoint, config);
      dispatch({
        type: Types.GET_ALL_USERS_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (error: any) {
      dispatch({type: Types.GET_ALL_USERS_LOADED_FAIL,});
    }
  } else {
    dispatch({type: Types.GET_ALL_USERS_LOADED_FAIL,});
  }
};

export default getAllUsersAction;
