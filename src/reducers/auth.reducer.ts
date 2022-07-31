import * as Types from "../actions/types";
import { IAction, IState } from "../interfaces";

const initialState: IState = {
  // access: sessionStorage.getItem("access"),
  // refresh: sessionStorage.getItem("refresh"),
  isAuthenticated: false,
  currentUser: null,
};

const userState = (state: IState = initialState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case Types.AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };

    case Types.LOGIN_SUCCESS:
      // sessionStorage.setItem("access", payload.access);
      // sessionStorage.setItem("refresh", payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        // access: payload.access,
        // refresh: payload.refresh,
      };

    case Types.USER_LOADED_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };

    case Types.AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };

    case Types.USER_LOADED_FAIL:
      return {
        ...state,
        currentUser: null,
      };

    case Types.LOGIN_FAIL:
    case Types.LOGOUT:
      sessionStorage.removeItem("access");
      sessionStorage.removeItem("refresh");
      return {
        ...state,
        // access: null,
        // refresh: null,
        isAuthenticated: false,
        currentUser: null,
      };

    case Types.REQUEST_RESET_PASSWORD_SUCCESS:
    case Types.REQUEST_RESET_PASSWORD_FAIL:
    case Types.RESET_PASSWORD_CONFIRM_SUCCESS:
    case Types.RESET_PASSWORD_CONFIRM_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default userState;
