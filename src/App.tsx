import * as React from "react";
import { connect } from "react-redux";

import Routes from "@/routes";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
import getCurrentUserAction from "@/actions/user/getCurrentUser.action";
import getAllUsersAction from "./actions/user/getAllUsers.action";

import "@/styles/index.scss";

const App: React.FC<any> = ({ checkAuthenticatedAction, getCurrentUserAction, getAllUsersAction }) => {
  const [loading, setLoading] = React.useState(true);
  const flag = React.useRef(false);

  React.useEffect(() => {
    if (!flag.current) {
      // checkAuthenticatedAction(getCurrentUserAction);
      getCurrentUserAction();
      setTimeout(() => setLoading(false), 1000);
      flag.current = true;
    }
  }, [flag, checkAuthenticatedAction, getCurrentUserAction, getAllUsersAction]);
  return loading ? (
    <div className="spinners-container">
      <img src="/static/svg/twitter-blue.svg" alt="" />
    </div>
  ) : (
    <Routes />
  );
};

export default connect(null, { checkAuthenticatedAction, getCurrentUserAction, getAllUsersAction })(App);
