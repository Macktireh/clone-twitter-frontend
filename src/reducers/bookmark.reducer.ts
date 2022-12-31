import * as Types from "@/actions/types";
import { IActionReducer, TBookmarkReducerType } from "@/models";

const initialState: TBookmarkReducerType = null;

const bookmarkReducer = (state: TBookmarkReducerType = initialState, action: IActionReducer): TBookmarkReducerType => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_BOOKMARKS_SUCCESS:
      return payload;

    case Types.GET_BOOKMARKS_FAIL:
      return null;

    default:
      return state;
  }
};

export default bookmarkReducer;
