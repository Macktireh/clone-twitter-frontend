import React from "react";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import { privateRoutes } from "@/routes/private.routes";
import { connect } from "react-redux";
import { IRootState, IPropsRootStateType } from "@/models";
import Aside from "@/components/aside/Aside";
import ButtonAddTweet from "@/components/navbar/ButtonAddTweet";

interface propsTypes
  extends Omit<
    IPropsRootStateType,
    "users" | "posts" | "postsLikes" | "comments" | "followers" | "following" | "peopleConnect"
  > {}

const Bookmarks: React.FC<propsTypes> = ({ currentUser }) => {
  React.useEffect(() => {
    document.title = privateRoutes.bookmarks.title;

    window.addEventListener("scroll", () => {
      const secHeaderBg: HTMLElement | null = document.querySelector(".sec-header");
      secHeaderBg?.classList.toggle("sticky-2", window.scrollY > 0);
    });
  });

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
        </div>
        <Aside page={privateRoutes.bookmarks.name} />
      </main>
      <ButtonAddTweet nameClass="add-tweet-global" />
    </>
  );
};

const BookmarksConnectWithStore: React.FC<propsTypes> = ({ currentUser }) => {
  return (
    <Layout>
      <Bookmarks currentUser={currentUser} />
    </Layout>
  );
};

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
});

export default connect(mapStateToProps, {})(BookmarksConnectWithStore);
