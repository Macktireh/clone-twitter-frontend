import axios from "axios";
import { AnyAction, Dispatch } from "redux";

import * as Types from "../types";

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
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/me/`, config);
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
