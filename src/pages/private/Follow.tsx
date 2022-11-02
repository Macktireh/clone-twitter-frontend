import React from "react";
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import NavTabs from "@/widgets/NavTabs";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import CardFollow from "@/components/follow/CardFollow";
import Aside from "@/components/aside/Aside";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import getAllUsersAction from "@/actions/user/getAllUsers.action";
import getAllFollowingAction from "@/actions/follow/getAllFollowing.action";
import getAllFollowersAction from "@/actions/follow/getAllFollowers.action";
import { IUserProfile, IRootState, IPropsRootStateType, TTabState } from "@/models";
import { privateRoutes } from "@/routes/private.routes";
import { Link } from "react-router-dom";

interface propsTypes
  extends Omit<IPropsRootStateType, "posts" | "comments" | "postsLikes" | "peopleConnect"> {
  title: string;
  followActive: number;
  getAllUsersAction: () => void;
  getAllFollowersAction: any;
  getAllFollowingAction: any;
}

const styleSpinnersLoding: React.CSSProperties = {
  width: "auto",
};

const Follow: React.FC<propsTypes> = ({
  title,
  followActive,
  currentUser,
  users,
  followers,
  following,
  getAllUsersAction,
  getAllFollowersAction,
  getAllFollowingAction,
}) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [activeTab, setActiveTab] = React.useState<number>(followActive);
  const [isCurrentUser, setIsCurrentUser] = React.useState<string>();
  const [another, setAnother] = React.useState<IUserProfile>();
  const { pseudo } = useParams();
  const flag = React.useRef(false);
  const flagFollow = React.useRef(false);
  const tabState: TTabState[] = [
    { id: 1, title: "Followers", grow: false },
    { id: 2, title: "Following", grow: false },
  ];

  const toggleTab = (id: number) => {
    setActiveTab(id);
  };

  React.useEffect(() => {
    document.title = `${title} ${currentUser?.user.first_name} ${currentUser?.user.last_name} (@${currentUser?.pseudo}) | Clone Twitter`;

    setActiveTab(followActive);
    if (!flag.current) {
      getAllUsersAction();
      flag.current = true;
    }

    if (currentUser && users) {
      if (pseudo === currentUser.pseudo) {
        setIsCurrentUser("yes");
        setAnother(currentUser);
        if (!flagFollow.current) {
          getAllFollowingAction(currentUser.user.public_id);
          getAllFollowersAction(currentUser.user.public_id);
          flagFollow.current = true;
        }
      } else {
        const searchUser = users.filter((user) => user.pseudo === pseudo);
        if (searchUser.length === 0) {
          setIsCurrentUser("error");
        } else {
          setIsCurrentUser("no");
          setAnother(searchUser[0]);
          if (!flagFollow.current) {
            getAllFollowingAction(searchUser[0].user.public_id);
            getAllFollowersAction(searchUser[0].user.public_id);
            flagFollow.current = true;
          }
        }
      }
    }

    if (currentUser && users && followers && following) setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag, pseudo, isCurrentUser, currentUser, users, followers, following, followActive]);

  if (isCurrentUser === "error") return <Navigate to="/error/404" />;

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
        <div className="Follow main-container">
          <section className="sec-header sticky-2">
            <SectionHeaderTweet
              page={privateRoutes.profile.name}
              title={`${another?.user.first_name} ${another?.user.last_name}`}
              subtitle={`@${another?.pseudo}`}
              currentUser={currentUser}
            />
            <nav>
              <NavTabs
                listTabs={tabState}
                activeTab={activeTab}
                toggleTab={toggleTab}
                linkActive={true}
                link={"/" + pseudo + "/"}
              />
            </nav>
          </section>
          {activeTab === 1 ? (
            <div className="list-cardFollow">
              {followers && another && followers.length > 0 ? (
                followers.map((u, index) => (
                  <CardFollow
                    key={index}
                    bio={true}
                    typeFollow={currentUser?.following.includes(u.user.public_id) ? 2 : 1}
                    userFollower={u.user}
                    user={another.user}
                    currentUser={currentUser}
                  />
                ))
              ) : (
                <div className="notFollow">
                  <img src="/static/img/followers.png" alt="" />
                  <div className="notFollowers">
                    <h1>Vous cherchez des followers ?</h1>
                    <p>
                      Lorsque quelqu'un suit ce compte, il apparaît ici. Le fait de tweeter et d'interagir
                      avec les autres permet d'augmenter le nombre de followers.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="list-cardFollow">
              {following && another && following.length > 0 ? (
                following.map((u, index) => (
                  <CardFollow
                    key={index}
                    bio={true}
                    typeFollow={currentUser?.following.includes(u.user.public_id) ? 2 : 1}
                    userFollower={u.user}
                    user={another.user}
                    currentUser={currentUser}
                  />
                ))
              ) : (
                <div className="notFollow">
                  <div className="notFollowers">
                    <h1>Soyez au courant</h1>
                    <p>
                      Suivre des comptes est un moyen facile de gérer votre ligne de temps et de savoir ce qui
                      se passe sur les sujets et les personnes qui vous intéressent.
                    </p>
                  </div>
                  <Link to={privateRoutes.peopleConnect.path} className="link">
                    Trouver des personnes à suivre
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        <Aside page={privateRoutes.home.name} />
      </main>
    </>
  );
};

const FollowConnectWithStore: React.FC<propsTypes> = ({
  title,
  followActive,
  currentUser,
  users,
  followers,
  following,
  getAllUsersAction,
  getAllFollowersAction,
  getAllFollowingAction,
}) => {
  return (
    <Layout>
      <Follow
        title={title}
        followActive={followActive}
        currentUser={currentUser}
        users={users}
        followers={followers}
        following={following}
        getAllUsersAction={getAllUsersAction}
        getAllFollowersAction={getAllFollowersAction}
        getAllFollowingAction={getAllFollowingAction}
      />
    </Layout>
  );
};

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
  users: state.userReducer,
  followers: state.followReducer.followers,
  following: state.followReducer.following,
});

export default connect(mapStateToProps, { getAllUsersAction, getAllFollowersAction, getAllFollowingAction })(
  FollowConnectWithStore
);
