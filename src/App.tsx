import * as React from "react";
import { connect } from "react-redux";

import Routes from "@/routes";
import getCurrentUserAction from "@/actions/user/getCurrentUser.action";

import "@/styles/index.scss";

type PropsType = { getCurrentUserAction: Function}

const App: React.FC<PropsType> = ({ getCurrentUserAction }) => {
  const [loading, setLoading] = React.useState(true);
  const flag = React.useRef(false);

  React.useEffect(() => {
    if (!flag.current) {
      getCurrentUserAction();
      setTimeout(() => setLoading(false), 1000);
      flag.current = true;
    }
  }, [flag, getCurrentUserAction]);
  return loading ? (
    <div className="spinners-container">
      <img src="/static/svg/twitter-blue.svg" alt="" />
    </div>
  ) : (
    <Routes />
  );
};

export default connect(null, { getCurrentUserAction })(App);
