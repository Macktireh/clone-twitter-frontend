import * as React from "react";
import { connect } from "react-redux";

import { IRootState } from "@/models";
import { Navigate, useSearchParams } from "react-router-dom";
import { privateRoutes } from "@/routes/private.routes";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import googleLoginAction from "@/actions/auth/googleLogin.action";

type TProps = {
  isPublic: boolean;
  isAuthenticated: boolean | null;
  children: React.PropsWithChildren<any>;
  googleLoginAction: (code: any) => void;
};

const AuthProvider: React.FC<TProps> = ({ isPublic, isAuthenticated, children, googleLoginAction }) => {
  const [loading, setLoading] = React.useState(true);
  let [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    const code = searchParams.get("code")
    if (code && isAuthenticated === false || isAuthenticated === null) {
      (async () => {
        await googleLoginAction( code );
        setTimeout(() => setLoading(false), 800);
      })();
    } else if (isAuthenticated !== null) setLoading(false);
  }, [loading, isAuthenticated]);

  if (!isPublic) {
    if (isAuthenticated === false) return <Navigate to="/" />;
  } else if (isAuthenticated) return <Navigate to={privateRoutes.home.path} />;

  return loading ? <SpinnersLoding isLoading={loading} /> : <>{children}</>;
};

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, {googleLoginAction})(AuthProvider);
