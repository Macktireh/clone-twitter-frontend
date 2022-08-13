import * as React from "react";
import { connect } from "react-redux";

import { TAuthUserReducer } from "@/models";
import { Navigate } from "react-router-dom";
import { tweetRoutes } from "@/routes/tweet.routes";

type TProps = {
  isPublic: boolean;
  isAuthenticated: boolean | null;
  children: React.PropsWithChildren<any>;
};

const AuthProvider: React.FC<TProps> = ({ isPublic, isAuthenticated, children }) => {
  if (!isPublic) {
    if (!isAuthenticated) return <Navigate to="/" />;
  } else if (isAuthenticated) return <Navigate to={tweetRoutes.home.path} />;

  return <>{children}</>;
};

const mapStateToProps = (state: TAuthUserReducer) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
});

export default connect(mapStateToProps, {})(AuthProvider);
