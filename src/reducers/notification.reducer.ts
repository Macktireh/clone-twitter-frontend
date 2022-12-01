import * as Types from "@/actions/types";
import { IActionReducer, INotif, TNotifReducerType } from "@/models";

const initialState: TNotifReducerType = null;

const notificationReducer = (state: TNotifReducerType = initialState, action: IActionReducer): TNotifReducerType => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_NOTIFICATION_SUCCESS:
      return payload;

    case Types.READ_NOTIFICATION_SUCCESS:
      const notifications = state?.slice();
      notifications?.filter((notif) => {
        if (notif.publicId === payload.publicId) {
          notif.read = true;
        }
        return notif;
      });
      return notifications as INotif[];

    case Types.GET_NOTIFICATION_FAIL:
    case Types.READ_NOTIFICATION_FAIL:
      return state;

    default:
      return state;
  }
};

export default notificationReducer;
