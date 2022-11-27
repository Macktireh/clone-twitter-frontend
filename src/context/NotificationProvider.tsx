// import { connectWS } from "@/services/soket";
import React from "react";
import { useDispatch } from "react-redux";

import getNotificationAction from "@/actions/notification/getNotification.action";
import getAllPostAction from "@/actions/post/getAllPost.action";
import getCurrentUserAction from "@/actions/user/getCurrentUser.action";
import { urlWebSocket } from "@/config/soket";

type ContextPropsType = { clientRef: any };

export const notificationType = {
  addPost: "Add_Post",
  deletePost: "Delete Post",
  likePost: "Like_Post",
  addComment: "Add_Comment",
  deleteComment: "Delete Comment",
  likeComment: "Like_Comment",
  following: "Follow_Or_Unfollow",
};

const NotificationContext = React.createContext<ContextPropsType | null>(null);

const NotificationProvider = ({ children }: React.PropsWithChildren) => {
  const dispatch = useDispatch();

  const clientRef = React.useRef<any>(null);
  const [waitingToReconnect, setWaitingToReconnect] = React.useState<boolean | null>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (waitingToReconnect) {
      return;
    }

    // Only set up the websocket once
    if (!clientRef.current) {
      const client = new WebSocket(urlWebSocket);
      clientRef.current = client;

      // window.client = client;

      client.onerror = (e) => null;

      client.onopen = () => {
        setIsOpen(true);
        // console.log("ws opened");
      };

      client.onclose = () => {
        if (clientRef.current) {
          // Connection failed
          // console.log("ws closed by server");
        } else {
          // Cleanup initiated from app side, can return here, to not attempt a reconnect
          // console.log("ws closed by app component unmount");
          return;
        }

        if (waitingToReconnect) {
          return;
        }

        // Parse event code and log
        setIsOpen(false);
        // console.log("ws closed");

        // Setting this will trigger a re-run of the effect,
        // cleaning up the current websocket, but not setting
        // up a new one right away
        setWaitingToReconnect(true);

        // This will trigger another re-run, and because it is false,
        // the socket will be set up again
        setTimeout(() => setWaitingToReconnect(null), 5000);
      };

      client.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === "notif_message") {
          // console.log("data.message : ", data.message);
          switch (data.message) {
            case notificationType.addPost:
            case notificationType.likePost:
            case notificationType.deletePost:
            case notificationType.addComment:
            case notificationType.deleteComment:
              dispatch(getAllPostAction() as any);
              break;
            case notificationType.following:
              dispatch(getCurrentUserAction() as any);
              break;
            default:
              break;
          }
          dispatch(getNotificationAction() as any);
        }
      };

      return () => {
        // console.log("Cleanup");
        // Dereference, so it will set up next time
        clientRef.current = null;

        client.close();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitingToReconnect]);

  return <NotificationContext.Provider value={{ clientRef }}>{children}</NotificationContext.Provider>;
};

export const useNotificationContext = (): ContextPropsType | null => {
  return React.useContext(NotificationContext);
};

export default NotificationProvider;
