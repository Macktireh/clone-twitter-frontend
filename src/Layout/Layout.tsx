import React, { PropsWithChildren, useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated } from "../actions/auth/checkAuthenticated.action";
import { loadUser } from "../actions/auth/loadUser.action";

const Layout = (props: PropsWithChildren<any>) => {
  useEffect(() => {
    props.checkAuthenticated();
    props.loadUser();
  }, []);

  return <>{props.children}</>;
};

export default connect(null, { checkAuthenticated, loadUser })(Layout);
