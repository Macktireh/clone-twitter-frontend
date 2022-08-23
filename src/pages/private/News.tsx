import React from "react";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/tweets/SectionHeaderTweet";
import AddNewPost from "@/components/tweets/AddNewPost";
import CardTweet from "@/components/tweets/CardTweet";
import Aside from "@/components/tweets/Aside";
import { tweetRoutes } from "@/routes/tweet.routes";
import { IAuthUserProfile, TAuthUserReducer } from "@/models";

type Props = { currentUser: IAuthUserProfile | null };

const News: React.FC<Props> = ({ currentUser }) => {
  React.useEffect(() => {
    document.title = tweetRoutes.home.title;

    window.addEventListener("scroll", () => {
      const secHeaderBg: HTMLElement | null = document.querySelector(".sec-header");
      secHeaderBg?.classList.toggle("sticky-2", window.scrollY > 0);
    });
  });

  return (
    <>
      <main className="main">
        <div className="News main-container">
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
      </main>
      <Aside page={tweetRoutes.home.name} />
    </>
  );
};

const NewsConnectWithStore: React.FC<Props> = ({ currentUser }) => {
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
