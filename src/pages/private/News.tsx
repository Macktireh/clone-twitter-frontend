import * as React from "react";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/tweets/SectionHeaderTweet";
import AddNewPost from "@/components/tweets/AddNewPost";
import CardTweet from "@/components/tweets/CardTweet";
import { tweetRoutes } from "@/routes/tweet.routes";
import { IAuthUserProfile, TAuthUserReducer } from "@/models";
import InputSearch from "@/components/widgets/InputSearch";
import Trending from "@/components/tweets/Trending";
import Follow from "@/components/tweets/Follow";
import FooterPrivate from "@/components/tweets/FooterPrivate";

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
      </main>
      <aside className="aside">
        <div className="search-container">
          <InputSearch />
        </div>
        <div className="trends-container">
          <h3>Trends for you</h3>
          {[1,2,3,4,5,6,7].map((n) => <Trending />)}
        </div>
        <div className="footer-container">
          <div className="follow-container">
            <h3>Who to follow</h3>
            {[1,2,3].map((n) => <Follow />)}
            <span className="show-more">Show more</span>
          </div>
          <FooterPrivate />
        </div>
      </aside>
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
