import React from "react";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import Aside from "@/components/aside/Aside";
import ButtonAddTweet from "@/components/navbar/ButtonAddTweet";
import ListBookmarkTweet from "@/components/bookmark/ListCardBookmarkTweet";
import getAllUsersAction from "@/actions/user/getAllUsers.action";
import getAllPostAction from "@/actions/post/getAllPost.action";
import { privateRoutes } from "@/routes/private.routes";
import { IRootState, IPropsRootStateType } from "@/models";

interface propsTypes
  extends Omit<IPropsRootStateType, "postsLikes" | "comments" | "followers" | "following" | "peopleConnect"> {
  getAllPostAction: () => Promise<void>;
  getAllUsersAction: () => Promise<void>;
}

const Bookmarks: React.FC<propsTypes> = ({
  currentUser,
  users,
  posts,
  getAllPostAction,
  getAllUsersAction,
}) => {
  const flag = React.useRef(false);

  React.useEffect(() => {
    document.title = privateRoutes.bookmarks.title;
    if (!flag.current) {
      getAllPostAction();
      getAllUsersAction();
      flag.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, posts, users]);

  return (
    <>
      <main className="main">
        <div className="Bookmarks main-container">
          <section className="sec-header sticky-2">
            <SectionHeaderTweet
              page={privateRoutes.bookmarks.name}
              title="Bookmarks"
              subtitle={"@" + currentUser?.pseudo}
              currentUser={currentUser}
            />
          </section>
          {posts && posts.length > 0 ? (
            <ListBookmarkTweet currentUser={currentUser} users={users} posts={posts} />
          ) : (
            <div className="not-book">
              <img src="/static/img/book-in-bird-cage.png" alt="book in bird cage" />
              <div className="text">
                <h2>Save Tweets for later</h2>
                <p>
                  Don’t let the good ones fly away! Bookmark <br /> Tweets to easily find them again in the
                  future.
                </p>
              </div>
            </div>
          )}
        </div>
        <Aside page={privateRoutes.bookmarks.name} />
      </main>
      <ButtonAddTweet nameClass="add-tweet-global" />
    </>
  );
};

const BookmarksConnectWithStore: React.FC<propsTypes> = ({
  currentUser,
  users,
  posts,
  getAllPostAction,
  getAllUsersAction,
}) => {
  return (
    <Layout>
      <Bookmarks
        currentUser={currentUser}
        users={users}
        posts={posts}
        getAllPostAction={getAllPostAction}
        getAllUsersAction={getAllUsersAction}
      />
    </Layout>
  );
};

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
  posts: state.postReducer,
  users: state.userReducer,
  // bookmarks: state.bookmarkReducer,
});

export default connect(mapStateToProps, { getAllPostAction, getAllUsersAction })(
  BookmarksConnectWithStore
);
