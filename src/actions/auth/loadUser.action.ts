import Axios from "@/api";
import { AnyAction, Dispatch } from "redux";

import * as Types from "@/actions/types";

const loadUserAction = () => async (dispatch: Dispatch<AnyAction> | any) => {
  if (sessionStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access"),
        Accept: "application/json",
      },
    };

    try {
      const res = await Axios.get("/api/me/", config);
      dispatch({
        type: Types.USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: Types.USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: Types.USER_LOADED_FAIL,
    });
  }
};

export default loadUserAction;
