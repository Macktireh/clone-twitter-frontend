import * as Types from "../actions/types";
import { IAuthUserAction, IAuthUserState } from "../models";

const initialState: IAuthUserState = {
  isAuthenticated: false,
  currentUser: null,
};

const userReducer = (state: IAuthUserState = initialState, action: IAuthUserAction): IAuthUserState => {
  const { type, payload } = action;

  switch (type) {
    case Types.AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };

    case Types.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };

    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
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

    case Types.SIGNUP_FAIL:
    case Types.LOGIN_FAIL:
    case Types.LOGOUT:
      sessionStorage.removeItem("access");
      sessionStorage.removeItem("refresh");
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
      };

    case Types.VERIFY_TOKEN_SUCCESS:
    case Types.VERIFY_TOKEN_FAIL:
    case Types.REFRESH_TOKEN_SUCCESS:
    case Types.REFRESH_TOKEN_FAIL:
    case Types.ACCOUNT_ACTIVATION_SUCCESS:
    case Types.ACCOUNT_ACTIVATION_FAIL:
    case Types.REQUEST_RESET_PASSWORD_SUCCESS:
    case Types.REQUEST_RESET_PASSWORD_FAIL:
    case Types.RESET_PASSWORD_SUCCESS:
    case Types.RESET_PASSWORD_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default userReducer;
