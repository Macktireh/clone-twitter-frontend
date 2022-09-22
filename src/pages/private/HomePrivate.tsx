import React from "react";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import AddNewPost from "@/components/homePrivate/AddNewPost";
import CardTweet from "@/components/homePrivate/CardTweet";
import Aside from "@/components/aside/Aside";
import { privateRoutes } from "@/routes/private.routes";
import { IStateReduce, PropsStateType } from "@/models";
import getAllPostAction from "@/actions/post/getAllPost.action";
import getAllUsersAction from "@/actions/user/getAllUsers.action";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import AddNewTweetProvider from "@/context/AddNewTweetProvider";

interface PropsType extends PropsStateType {
  getAllPostAction?: any;
  getAllUsersAction?: any;
}

const styleSpinnersLoding: React.CSSProperties = {
  top: "20%",
};

const HomePrivate: React.FC<PropsType> = ({
  currentUser,
  users,
  posts,
  getAllUsersAction,
  getAllPostAction,
}) => {
  const [loading, setLoading] = React.useState(true);
  const flag = React.useRef(false);
  React.useEffect(() => {
    document.title = privateRoutes.home.title;
    if (!flag.current) {
      getAllUsersAction();
      getAllPostAction();
      flag.current = true;
    }

    if (currentUser && users && posts) setLoading(false);
  }, [flag, currentUser, users, posts, getAllPostAction, getAllUsersAction]);

  return (
    <>
      <main className="main">
        <div className="HomePrivate main-container">
          <section className="sec-header sticky-2">
            <SectionHeaderTweet page={privateRoutes.home.name} title="Latest Tweets" />
          </section>
          <section className="sec-add-new-post">
            <AddNewTweetProvider>
              <AddNewPost />
            </AddNewTweetProvider>
          </section>
          <div className="line"></div>
          <section className="sec-list-post">
            {loading ? (
              <SpinnersLoding isLoading={loading} styleSpinnersLoding={styleSpinnersLoding} />
            ) : (
              posts
                ?.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
                .map((post) => (
                  <div className="list-post" key={post.publicId}>
                    <CardTweet currentUser={currentUser} post={post} users={users} />
                  </div>
                ))
            )}
          </section>
        </div>
      </main>
      <Aside page={privateRoutes.home.name} />
    </>
  );
};

const HomePrivateConnectWithStore: React.FC<PropsType> = ({
  currentUser,
  users,
  posts,
  getAllUsersAction,
  getAllPostAction,
}) => {
  return (
    <Layout>
      <HomePrivate
        currentUser={currentUser}
        users={users}
        posts={posts}
        getAllUsersAction={getAllUsersAction}
        getAllPostAction={getAllPostAction}
      />
    </Layout>
  );
};

const mapStateToProps = (state: IStateReduce) => ({
  currentUser: state.authReducer.currentUser,
  users: state.userReducer.users,
  posts: state.postReducer,
});

export default connect(mapStateToProps, { getAllUsersAction, getAllPostAction })(HomePrivateConnectWithStore);
