import React from "react";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/tweets/SectionHeaderTweet";
import { tweetRoutes } from "@/routes/tweet.routes";
import { connect } from "react-redux";
import { IAuthUserProfile, TAuthUserReducer } from "@/models";
import Aside from "@/components/tweets/Aside";

type Props = { currentUser: IAuthUserProfile | null };

const Bookmarks: React.FC<Props> = () => {
  return (
    <>
      <main className="main">
        <div className="Bookmarks main-container">
          <section className="sec-header">
            <SectionHeaderTweet page={tweetRoutes.bookmarks.name} title="Bookmarks" />
          </section>
          <div>Bookmarks</div>
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