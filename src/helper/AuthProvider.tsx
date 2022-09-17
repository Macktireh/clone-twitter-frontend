import * as React from "react";
import { connect } from "react-redux";

import { IStateReduce } from "@/models";
import { Navigate } from "react-router-dom";
import { tweetRoutes } from "@/routes/tweet.routes";
import SpinnersLoding from "@/components/widgets/SpinnersLoding";

type TProps = {
  isPublic: boolean;
  isAuthenticated: boolean | null;
  children: React.PropsWithChildren<any>;
};

const AuthProvider: React.FC<TProps> = ({ isPublic, isAuthenticated, children }) => {
  const [loading, setLoading] = React.useState(true);
  if (!isPublic) {
    if (!isAuthenticated) return <Navigate to="/" />;
  } else if (isAuthenticated) return <Navigate to={tweetRoutes.home.path} />;

  setTimeout(() => setLoading(false), 1500);

  return loading ? (
    <SpinnersLoding isLoading={loading} />
  ) : (
    <>{children}</>
  );
};

const mapStateToProps = (state: IStateReduce) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, {})(AuthProvider);
