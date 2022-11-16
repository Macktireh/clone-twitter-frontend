import * as Types from "@/actions/types";
// import { baseURL } from "@/config/axios";
import { IActionReducer, TNotifReducerType } from "@/models";

const initialState: TNotifReducerType = null;

const notificationReducer = (state: TNotifReducerType = initialState, action: IActionReducer): TNotifReducerType => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_NOTIFICATION_SUCCESS:
      return payload;

    case Types.GET_NOTIFICATION_FAIL:
      return state;

    default:
      return state;
  }
};

export default notificationReducer;
