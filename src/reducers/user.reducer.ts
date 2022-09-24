import * as Types from "@/actions/types";
import { IActionReducer, IUsersReducerType } from "@/models";

const initialState: IUsersReducerType = null;

const userReducer = (state: IUsersReducerType = initialState, action: IActionReducer): IUsersReducerType => {
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
