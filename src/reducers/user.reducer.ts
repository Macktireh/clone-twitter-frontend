import * as Types from "@/actions/types";
import { IActionState, IUsersState } from "@/models";

const initialState: IUsersState = {
  users: null,
};

const userReducer = (state: IUsersState = initialState, action: IActionState): IUsersState => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_ALL_USERS_LOADED_SUCCESS:
      return {
        ...state,
        users: payload,
      };

      case Types.GET_ALL_USERS_LOADED_FAIL:
      return {
        ...state,
        users: null,
      };

    default:
      return state;
  }
};

export default userReducer;
