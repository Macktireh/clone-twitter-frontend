import React from "react";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import CardTweet from "@/components/homePrivate/CardTweet";
import Aside from "@/components/aside/Aside";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import getAllPostAction from "@/actions/post/getAllPost.action";
import getAllUsersAction from "@/actions/user/getAllUsers.action";
import { privateRoutes } from "@/routes/private.routes";
import { IRootState, IPropsRootStateType } from "@/models";
import AddNewPost1 from "@/components/homePrivate/AddNewPost";
import PopupDeletePost1 from "@/components/homePrivate/PopupDeletePost";
import ButtonAddTweet from "@/components/navbar/ButtonAddTweet";

interface propsTypes
  extends Omit<IPropsRootStateType, "postsLikes" | "comments" | "followers" | "following"> {
  getAllPostAction?: any;
  getAllUsersAction?: any;
}

const styleSpinnersLoding: React.CSSProperties = {
  top: "20%",
};

const HomePrivate: React.FC<propsTypes> = ({
  currentUser,
  users,
  posts,
  getAllUsersAction,
  getAllPostAction,
}) => {
  // const [loading, setLoading] = React.useState(true);
  const flag = React.useRef(false);

  React.useEffect(() => {
    document.title = privateRoutes.home.title;
    if (!flag.current) {
      getAllUsersAction();
      getAllPostAction();
      flag.current = true;
    }
    // if (currentUser && users && posts) setLoading(false);
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
            <AddNewPost1 nameClass="textarea-1" />
          </section>
          {/* <div className="line"></div> */}
          <section className="sec-list-post">
            {!currentUser && !users && !posts ? (
              <SpinnersLoding
                isLoading={!currentUser && !users && !posts ? true : false}
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
      <PopupDeletePost1 />
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
