import * as React from "react";
import { connect } from "react-redux";

import "@/styles/index.scss";
import Routes from "@/routes";
import getCurrentUserAction from "@/actions/user/getCurrentUser.action";

type propsTypes = { getCurrentUserAction: () => void };

const App: React.FC<propsTypes> = ({ getCurrentUserAction }) => {
  const [loading, setLoading] = React.useState(true);
  const flag = React.useRef(false);

  React.useEffect(() => {
    if (!flag.current) {
      (async () => {
        await getCurrentUserAction();
        setTimeout(() => setLoading(false), 800);
        flag.current = true;
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);
  return loading ? (
    <div className="spinners-container">
      <img src="/static/svg/twitter-blue.svg" alt="" />
    </div>
  ) : (
    <Routes />
  );
};

export default connect(null, { getCurrentUserAction })(App);
