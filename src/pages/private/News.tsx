import * as React from "react";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/tweets/SectionHeaderTweet";
import AddNewPost from "@/components/tweets/AddNewPost";
import CardTweet from "@/components/tweets/CardTweet";
import { tweetRoutes } from "@/routes/tweet.routes";
import { IAuthUserProfile, TAuthUserReducer } from "@/models";

type TcurrentUser = { currentUser: IAuthUserProfile | null };

const News: React.FC<TcurrentUser> = ({ currentUser }) => {
  React.useEffect(() => {
    document.title = tweetRoutes.home.title;

    window.addEventListener("scroll", () => {
      const secHeaderBg: HTMLElement | null = document.querySelector(".sec-header");
      secHeaderBg?.classList.toggle("sticky-2", window.scrollY > 0);
    });
  });
  return (
    <div className="News">
      <section className="sec-header">
        <SectionHeaderTweet page={tweetRoutes.home.name} title="Latest Tweets" />
      </section>
      <section className="sec-add-new-post">
        <AddNewPost currentUser={currentUser} />
      </section>
      <div className="line"></div>
      <section className="sec-list-post">
        {[1, 2, 3, 4, 5, 6].map((post) => (
          <div className="list-post">
            <CardTweet currentUser={currentUser} />
          </div>
        ))}
      </section>
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
