import * as React from "react";
import { connect } from "react-redux";

import Routes from "@/routes";
import getCurrentUserAction from "@/actions/user/getCurrentUser.action";
import getAllFollowersAction from "@/actions/follow/getAllFollowers.action";
import getAllFollowingAction from "@/actions/follow/getAllFollowing.action";

import "@/styles/index.scss";

type propsTypes = {
  getCurrentUserAction: () => void;
  getAllFollowersAction: () => void;
  getAllFollowingAction: () => void;
};

const App: React.FC<propsTypes> = ({
  getCurrentUserAction,
  getAllFollowersAction,
  getAllFollowingAction,
}) => {
  const [loading, setLoading] = React.useState(true);
  const flag = React.useRef(false);

  React.useEffect(() => {
    if (!flag.current) {
      (async () => {
        await getCurrentUserAction();
        await getAllFollowersAction();
        await getAllFollowingAction();
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

export default connect(null, { getCurrentUserAction, getAllFollowersAction, getAllFollowingAction })(App);
