import * as Types from "@/actions/types";
import { IActionReducer, INotif, TNotifReducerType } from "@/models";

const initialState: TNotifReducerType = { numberMessagesNotif: 0, notifications: null };

const notificationReducer = (
  state: TNotifReducerType = initialState,
  action: IActionReducer
): TNotifReducerType => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_NOTIFICATION_SUCCESS:
      return { ...state, notifications: payload};

    case Types.READ_NOTIFICATION_SUCCESS:
      const notifications = state?.notifications?.slice();
      notifications?.filter((notif) => {
        if (notif.publicId === payload.publicId) {
          notif.read = true;
        }
        return notif;
      });
      return { ...state, notifications: notifications as INotif[] };

    case Types.PREVIEW_NOTIFICATION_MESSAGES_SUCCESS:
      return { ...state, numberMessagesNotif: payload.numberMessagesNotif };

    case Types.GET_NOTIFICATION_FAIL:
    case Types.READ_NOTIFICATION_FAIL:
    case Types.PREVIEW_NOTIFICATION_MESSAGES_FAIL:
      return state;

    default:
      return state;
  }
};

export default notificationReducer;
