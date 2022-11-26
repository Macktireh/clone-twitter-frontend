import * as React from "react";
import { connect } from "react-redux";

import "@/styles/index.scss";
import Routes from "@/routes";
import getCurrentUserAction from "@/actions/user/getCurrentUser.action";
import NotificationProvider from "@/context/NotificationProvider";
import getNotificationAction from "./actions/notification/getNotification.action";

type propsTypes = { 
  getCurrentUserAction: () => void 
  getNotificationAction: () => void 
};

const App: React.FC<propsTypes> = ({ getCurrentUserAction, getNotificationAction }) => {
  const [loading, setLoading] = React.useState(true);
  const flag = React.useRef(false);

  React.useEffect(() => {
    if (!flag.current) {
      (async () => {
        await getCurrentUserAction();
        await getNotificationAction();
        setTimeout(() => setLoading(false), 800);
        flag.current = true;
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);
  return loading ? (
    <div className="spinners-container">
      <img src="/static/svg/twitter-blue.svg" alt="" />
    </div>
  ) : (
    <NotificationProvider>
      <Routes />
    </NotificationProvider>
  );
};

export default connect(null, { getCurrentUserAction, getNotificationAction })(App);
