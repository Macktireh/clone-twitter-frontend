import * as Types from "@/actions/types";
import { IPost, PostReducerType } from "@/models";

const initialState: PostReducerType = null;

const postReducer = (state: PostReducerType = initialState, action: any): PostReducerType => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_ALL_POST_SUCCESS:
      return payload;

    case Types.ADD_NEW_POST_SUCCESS:
      return [...state as IPost[], payload];

    case Types.GET_ALL_POST_FAIL:
    case Types.ADD_NEW_POST_FAIL:
      return [];

    default:
      return state;
  }
};

export default postReducer;
