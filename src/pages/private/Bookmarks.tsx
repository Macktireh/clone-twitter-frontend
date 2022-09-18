import React from "react";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import { privateRoutes } from "@/routes/private.routes";
import { connect } from "react-redux";
import { IAuthUserProfile, IStateReduce } from "@/models";
import Aside from "@/components/aside/Aside";

type Props = { currentUser: IAuthUserProfile | null };

const Bookmarks: React.FC<Props> = ({ currentUser }) => {
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
      <Aside page={privateRoutes.bookmarks.name} />
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

const mapStateToProps = (state: IStateReduce) => ({
  currentUser: state.authReducer.currentUser,
});

export default connect(mapStateToProps, {})(BookmarksConnectWithStore);
