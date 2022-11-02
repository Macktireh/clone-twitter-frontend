import * as Types from "@/actions/types";
import { TPostReducerType } from "@/models";

const initialState: TPostReducerType = null;

const mylLikesPostReducer = (state: TPostReducerType = initialState, action: any): TPostReducerType => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_LIST_POSTS_LIKES_SUCCESS:
      return payload;

    case Types.GET_LIST_POSTS_LIKES_FAIL:
      return null

    default:
      return state;
  }
};

export default mylLikesPostReducer;
