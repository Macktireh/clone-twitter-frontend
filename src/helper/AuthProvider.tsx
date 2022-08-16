import * as React from "react";
import { connect } from "react-redux";

import ScaleLoader from "react-spinners/ScaleLoader";

import { TAuthUserReducer } from "@/models";
import { Navigate } from "react-router-dom";
import { tweetRoutes } from "@/routes/tweet.routes";

const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

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
    <div className="spinners-container">
      <ScaleLoader color={"#1d9bf0"} loading={loading} cssOverride={override} />
    </div>
  ) : (
    <>{children}</>
  );
};

const mapStateToProps = (state: TAuthUserReducer) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
});

export default connect(mapStateToProps, {})(AuthProvider);
