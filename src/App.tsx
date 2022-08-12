import * as React from "react";

import { connect } from "react-redux";

import Routes from "@/routes";
import checkAuthenticatedAction from "@/actions/auth/checkAuthenticated.action";
import loadUserAction from "@/actions/auth/loadUser.action";

import "@/styles/index.scss";

const App: React.FC<any> = ({ checkAuthenticatedAction, loadUserAction }) => {
  React.useEffect(() => {
    checkAuthenticatedAction();
    loadUserAction();
  });
  return <Routes />;
};

export default connect(null, { checkAuthenticatedAction, loadUserAction })(App);
