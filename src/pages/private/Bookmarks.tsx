import React from "react";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/tweets/SectionHeaderTweet";
import { tweetRoutes } from "@/routes/tweet.routes";
import { connect } from "react-redux";
import { IAuthUserProfile, TAuthUserReducer } from "@/models";
import Aside from "@/components/tweets/Aside";

type Props = { currentUser: IAuthUserProfile | null };

const Bookmarks: React.FC<Props> = ({ currentUser }) => {

  React.useEffect(() => {
    document.title = tweetRoutes.bookmarks.title;

    window.addEventListener("scroll", () => {
      const secHeaderBg: HTMLElement | null = document.querySelector(".sec-header");
      secHeaderBg?.classList.toggle("sticky-2", window.scrollY > 0);
    });
  });

  return (
    <>
      <main className="main">
        <div className="Bookmarks main-container">
          <section className="sec-header">
            <SectionHeaderTweet
              page={tweetRoutes.bookmarks.name}
              title="Bookmarks"
              subtitle={"@" + currentUser?.pseudo}
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
      </main>
      <Aside page={tweetRoutes.bookmarks.name} />
    </>
  );
};

const BookmarksConnectWithStore: React.FC<Props> = ({ currentUser }) => {
  return (
    <Layout>
      <Bookmarks currentUser={currentUser} />
    </Layout>
  );
};

const mapStateToProps = (state: TAuthUserReducer) => ({
  currentUser: state.userReducer.currentUser,
});

export default connect(mapStateToProps, {})(BookmarksConnectWithStore);
