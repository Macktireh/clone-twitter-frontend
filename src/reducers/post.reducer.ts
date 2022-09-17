import * as Types from "@/actions/types";
import { IPostState } from "@/models";

const initialState: IPostState = {
  tweets: null,
};

const postReducer = (state: IPostState = initialState, action: any): IPostState => {
  const { type, payload } = action;

  switch (type) {

    case Types.GET_ALL_POST_SUCCESS:
      return {
        ...state,
        tweets: payload,
      };

    case Types.GET_ALL_POST_FAIL:
      return {
        ...state,
        tweets: null,
      };

    default:
      return state;
  }
};

export default postReducer;