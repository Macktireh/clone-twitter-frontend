import React, { PropsWithChildren, useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated, loadUser } from "./../actions/auth.action";

const Layout = (props: PropsWithChildren<any>) => {
  useEffect(() => {
    props.checkAuthenticated();
    props.loadUser();
  }, []);

  return <>{props.children}</>;
};

export default connect(null, { checkAuthenticated, loadUser })(Layout);
