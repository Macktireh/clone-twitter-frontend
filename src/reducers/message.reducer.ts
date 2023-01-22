import * as Types from "@/actions/types";
import { IActionReducer, TMessageReducerType } from "@/models";

const initialState: TMessageReducerType = null;

const messageReducer = ( state: TMessageReducerType = initialState, action: IActionReducer ): TMessageReducerType => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_MESSAGE_SUCCESS:
      return payload;

    case Types.GET_MESSAGE_FAIL:
      return null;

    default:
      return state;
  }
};

export default messageReducer;
