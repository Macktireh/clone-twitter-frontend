import * as Types from "@/actions/types";
import { IActionReducer, TUsersReducerType } from "@/models";

const initialState: TUsersReducerType = null;

const userReducer = (state: TUsersReducerType = initialState, action: IActionReducer): TUsersReducerType => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_ALL_USERS_LOADED_SUCCESS:
      return payload;

    case Types.GET_ALL_USERS_LOADED_FAIL:
      return null;

    default:
      return state;
  }
};

export default userReducer;
