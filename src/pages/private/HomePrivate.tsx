import React from "react";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import AddNewPost from "@/components/homePrivate/AddNewPost";
import ButtonAddTweet from "@/components/navbar/ButtonAddTweet";
import CardTweet from "@/components/homePrivate/CardTweet";
import PopupDeletePost from "@/components/homePrivate/PopupDeletePost";
import Aside from "@/components/aside/Aside";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import getAllPostAction from "@/actions/post/getAllPost.action";
import getAllUsersAction from "@/actions/user/getAllUsers.action";
import { privateRoutes } from "@/routes/private.routes";
import { IRootState, IPropsRootStateType } from "@/models";

interface propsTypes
  extends Omit<IPropsRootStateType, "postsLikes" | "comments" | "followers" | "following" | "peopleConnect"> {
  getAllPostAction: () => void;
  getAllUsersAction: () => void;
}

const styleSpinnersLoding: React.CSSProperties = {
  top: "20%",
  marginTop: "150px",
};

const HomePrivate: React.FC<propsTypes> = ({
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag, currentUser, users, posts]);

  return (
    <>
      <main className="main">
        <div className="HomePrivate main-container">
          <section className="sec-header sticky-2">
            <SectionHeaderTweet
              page={privateRoutes.home.name}
              title="Latest Tweets"
              currentUser={currentUser}
            />
          </section>
          <section className="sec-add-new-post">
            <AddNewPost nameClass="textarea-1" />
          </section>
          <section className="sec-list-post">
            {loading ? (
              <SpinnersLoding
                isLoading={loading}
                styleSpinnersLoding={styleSpinnersLoding}
              />
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
        <Aside page={privateRoutes.home.name} />
      </main>
      <ButtonAddTweet nameClass="add-tweet-global" />
      <PopupDeletePost />
    </>
  );
};

const HomePrivateConnectWithStore: React.FC<propsTypes> = ({
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

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
  users: state.userReducer,
  posts: state.postReducer,
});

export default connect(mapStateToProps, { getAllUsersAction, getAllPostAction })(HomePrivateConnectWithStore);
