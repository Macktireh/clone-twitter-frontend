import * as React from "react";
import { connect } from "react-redux";

import { IRootState } from "@/models";
import { Navigate } from "react-router-dom";
import { privateRoutes } from "@/routes/private.routes";
import SpinnersLoding from "@/widgets/SpinnersLoding";

type TProps = {
  isPublic: boolean;
  isAuthenticated: boolean | null;
  children: React.PropsWithChildren<any>;
};

const AuthProvider: React.FC<TProps> = ({ isPublic, isAuthenticated, children }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (isAuthenticated !== null) setLoading(false);
  }, [loading, isAuthenticated]);

  if (!isPublic) {
    if (isAuthenticated === false) return <Navigate to="/" />;
  } else if (isAuthenticated) return <Navigate to={privateRoutes.home.path} />;

  return loading ? <SpinnersLoding isLoading={loading} /> : <>{children}</>;
};

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, {})(AuthProvider);
