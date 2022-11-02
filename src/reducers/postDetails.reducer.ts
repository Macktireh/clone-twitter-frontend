import * as Types from "@/actions/types";
import { IPost } from "@/models";

type TPostDetailsReducer = IPost | null;

const initialState: TPostDetailsReducer = null;

const postDetailsReducer = (state: TPostDetailsReducer = initialState, action: any): TPostDetailsReducer => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_ONE_POST_SUCCESS:
      return payload;

    case Types.GET_ONE_POST_FAIL:
      return null;

    default:
      return state;
  }
};

export default postDetailsReducer;
