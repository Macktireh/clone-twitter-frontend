import * as React from "react";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/tweets/SectionHeaderTweet";
import { tweetRoutes } from "@/routes/tweet.routes";
import { IAuthUserProfile, TAuthUserReducer } from "@/models";

type TcurrentUser = { currentUser: IAuthUserProfile | null };

const News: React.FC<TcurrentUser> = ({ currentUser }) => {
  React.useEffect(() => {
    document.title = tweetRoutes.home.title;
  });
  return (
    <div className="News">
      <section className="sec-header">
        <SectionHeaderTweet page={tweetRoutes.home.name} title="Latest Tweets" />
      </section>
      <section className="sec-add-new-post"></section>
      <div className="line"></div>
      <section className="sec-list-post"></section>
    </div>
  );
};

const NewsConnectWithStore: React.FC<any> = ({ currentUser }) => {
  return (
    <Layout>
      <News currentUser={currentUser} />
    </Layout>
  );
};

const mapStateToProps = (state: TAuthUserReducer) => ({
  currentUser: state.userReducer.currentUser,
});

export default connect(mapStateToProps, {})(NewsConnectWithStore);
