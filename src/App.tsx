import * as React from "react";

import { connect } from "react-redux";

import Routes from "./routes";
import checkAuthenticated from "./actions/auth/checkAuthenticated.action";
import loadUser from "./actions/auth/loadUser.action";

import "./styles/index.scss";

const App: React.FC<any> = ({ checkAuthenticated, loadUser }) => {
  React.useEffect(() => {
    checkAuthenticated();
    loadUser();
  });
  return <Routes />;
};

export default connect(null, { checkAuthenticated, loadUser })(App);
