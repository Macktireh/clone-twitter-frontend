import * as Types from "@/actions/types";
import { IActionReducer, TFollowReducerType } from "@/models";

const initialState: TFollowReducerType = {
  following: null,
  followers: null,
  peopleConnect: null
};

const followReducer = (state: TFollowReducerType = initialState, action: IActionReducer): TFollowReducerType => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_ALL_FOLLOWING_SUCCESS:
      return {
        ...state,
        following: payload
      };

    case Types.GET_ALL_FOLLOWING_FAIL:
      return {
        ...state,
        following: null
      };

    case Types.GET_ALL_FOLLOWERS_SUCCESS:
      return {
        ...state,
        followers: payload
      };

    case Types.GET_ALL_FOLLOWERS_FAIL:
      return {
        ...state,
        followers: null
      };

    case Types.GET_PEOPLE_CONNECT_SUCCESS:
      return {
        ...state,
        peopleConnect: payload
      };

    case Types.GET_PEOPLE_CONNECT_FAIL:
      return {
        ...state,
        peopleConnect: null
      };

    default:
      return state;
  }
};

export default followReducer;
