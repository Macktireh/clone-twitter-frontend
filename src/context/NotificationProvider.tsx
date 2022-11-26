// import { connectWS } from "@/services/soket";
import React from "react";
import { useDispatch } from "react-redux";

import getNotificationAction from "@/actions/notification/getNotification.action";
import { notifSocket } from "@/config/soket";

type ContextPropsType = {
  notificationType: { typeNotif: string; setTypeNotif: () => void };
  notifSocket: WebSocket;
};

export const notification = {
  addPost: "Add Post",
  deletePost: "Delete Post",
  likePost: "Like Post",
  addComment: "Add Comment",
  deleteComment: "Delete Comment",
  likeComment: "Like Comment",
  following: "following",
};

const NotificationContext = React.createContext<ContextPropsType | null>(null);

const NotificationProvider = ({ children }: React.PropsWithChildren) => {
  const [typeNotif, setTypeNotif] = React.useState<string>("");
  const dispatch = useDispatch();

  const notificationType = {
    typeNotif,
    setTypeNotif: () => setTypeNotif(""),
  };

  const connectWS = (ws: WebSocket) => {
    ws.onopen = function (e) {
      console.log("Successfully connected to the WebSocket from useContext.");
    };

    ws.onclose = function (e) {
      console.log("WebSocket connection closed unexpectedly. Trying to reconnect in 2s...");
      setTimeout(function () {
        console.log("Reconnecting...");
        connectWS(ws);
      }, 2000);
    };

    ws.onmessage = function (e) {
      const data = JSON.parse(e.data);
      if (data.type === "notif_message") {
        console.log("data.message : ", data.message);
        dispatch(getNotificationAction() as any);
      }
    };

    ws.onerror = function (err: any) {
      console.log("WebSocket encountered an error: " + err.message);
      console.log("Closing the socket.");
      ws.close();
    };
  };

  React.useEffect(() => {
    connectWS(notifSocket);
    if (typeNotif) {
      if (typeNotif === notification.addPost) console.log(notification.addPost);
      else if (typeNotif === notification.likePost) console.log(notification.likePost);
      else if (typeNotif === notification.addComment) console.log(notification.addComment);
      else if (typeNotif === notification.likeComment) console.log(notification.likeComment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeNotif]);

  return (
    <NotificationContext.Provider value={{ notificationType, notifSocket }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): ContextPropsType | null => {
  return React.useContext(NotificationContext);
};

export default NotificationProvider;
