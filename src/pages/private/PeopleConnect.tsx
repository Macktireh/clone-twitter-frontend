import React from "react";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import CardFollow from "@/components/follow/CardFollow";
import Aside from "@/components/aside/Aside";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import getAllUsersAction from "@/actions/user/getAllUsers.action";
import getPeopleConnect from "@/actions/follow/getPeopleConnect.action";
import { IRootState, IPropsRootStateType } from "@/models";
import { privateRoutes } from "@/routes/private.routes";

interface propsTypes
  extends Omit<IPropsRootStateType, "posts" | "comments" | "postsLikes" | "following" | "followers"> {
  getAllUsersAction: () => void;
  getPeopleConnect: () => void;
}

const styleSpinnersLoding: React.CSSProperties = {
  width: "auto",
};

const PeopleConnect: React.FC<propsTypes> = ({
  currentUser,
  users,
  peopleConnect,
  getAllUsersAction,
  getPeopleConnect,
}) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const flag = React.useRef(false);

  React.useEffect(() => {
    document.title = privateRoutes.peopleConnect.title;

    if (!flag.current) {
      getAllUsersAction();
      getPeopleConnect();
      flag.current = true;
    }

    if (currentUser && users && peopleConnect) setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag, currentUser, users, peopleConnect]);

  return loading ? (
    <>
      <main className="main">
        <SpinnersLoding isLoading={loading} styleSpinnersLoding={styleSpinnersLoding} />
        <aside className="aside"></aside>
      </main>
    </>
  ) : (
    <>
      <main className="main">
        <div className="peopleConnect main-container">
          <section className="sec-header sticky-2">
            <SectionHeaderTweet page={privateRoutes.profile.name} title="Connect" currentUser={currentUser} />
          </section>
          <section className="content">
            <h3>Suggested for you</h3>
            <div className="list-cardPeopleConnect">
              {peopleConnect &&
                peopleConnect
                  .slice(0, 3)
                  .map((u, i) => (
                    <CardFollow
                      key={i}
                      bio={true}
                      typeFollow={1}
                      userFollower={u}
                      user={currentUser && currentUser?.user}
                      currentUser={currentUser}
                    />
                  ))}
            </div>
          </section>
        </div>
        <Aside page={privateRoutes.peopleConnect.name} />
      </main>
    </>
  );
};

const PeopleConnectConnectWithStore: React.FC<propsTypes> = ({
  currentUser,
  users,
  peopleConnect,
  getAllUsersAction,
  getPeopleConnect,
}) => {
  return (
    <Layout>
      <PeopleConnect
        currentUser={currentUser}
        users={users}
        peopleConnect={peopleConnect}
        getAllUsersAction={getAllUsersAction}
        getPeopleConnect={getPeopleConnect}
      />
    </Layout>
  );
};

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
  users: state.userReducer,
  peopleConnect: state.followReducer.peopleConnect,
});

export default connect(mapStateToProps, { getAllUsersAction, getPeopleConnect })(
  PeopleConnectConnectWithStore
);
