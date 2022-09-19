import * as Types from "@/actions/types";
import { IActionState, IAuthUserState } from "@/models";

const initialState: IAuthUserState = {
  isAuthenticated: false,
  currentUser: null,
};

const authReducer = (state: IAuthUserState = initialState, action: IActionState): IAuthUserState => {
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

    case Types.UPDATE_PROFILE_CURRENT_USER_LOADED_SUCCESS:
    case Types.GET_CURRENT_USER_LOADED_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };

    case Types.AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };

    case Types.UPDATE_PROFILE_CURRENT_USER_LOADED_FAIL:
    case Types.GET_CURRENT_USER_LOADED_FAIL:
      return {
        ...state,
        currentUser: null,
      };

    case Types.SIGNUP_FAIL:
    case Types.LOGIN_FAIL:
    case Types.LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
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

export default authReducer;
