import * as React from "react";
import { connect } from "react-redux";

import Routes from "@/routes";
import getCurrentUserAction from "@/actions/user/getCurrentUser.action";
import NotificationProvider from "@/context/NotificationProvider";
import ThisIsNnotTwitter from "@/helper/ThisIsNnotTwitter";

import "@/styles/index.scss";
import "react-toastify/dist/ReactToastify.css";

type propsTypes = {
  getCurrentUserAction: () => void;
};

const App: React.FC<propsTypes> = ({ getCurrentUserAction }) => {
  const [loading, setLoading] = React.useState(true);
  const flag = React.useRef(false);

  React.useEffect(() => {
    if (!flag.current) {
      (async () => {
        await getCurrentUserAction();
        setTimeout(() => setLoading(false), 2500);
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
      <ThisIsNnotTwitter />
      <Routes />
    </NotificationProvider>
  );
};

export default connect(null, { getCurrentUserAction })(App);
