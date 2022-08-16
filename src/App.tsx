import * as React from "react";
import { connect } from "react-redux";

import Routes from "@/routes";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
import loadUserAction from "@/actions/auth/loadUser.action";

import "@/styles/index.scss";

const App: React.FC<any> = ({ checkAuthenticatedAction, loadUserAction }) => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    checkAuthenticatedAction();
    loadUserAction();
    setTimeout(() => setLoading(false), 1000);
  });
  return loading ? (
    <div className="spinners-container">
      <img src="./static/svg/twitter-blue.svg" alt="" width="60px" />
    </div>
  ) : (
    <Routes />
  );
};

export default connect(null, { checkAuthenticatedAction, loadUserAction })(App);
