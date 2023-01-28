import React from "react";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import ButtonAddTweet from "@/components/navbar/ButtonAddTweet";
import Trending from "@/components/aside/Trending";
import Aside from "@/components/aside/Aside";
import { privateRoutes } from "@/routes/private.routes";
import { connect } from "react-redux";
import { IRootState, IPropsRootStateType } from "@/models";
import { dataTrends } from "@/components/aside/data-trend";

interface propsTypes
  extends Omit<
    IPropsRootStateType,
    "users" | "posts" | "postsLikes" | "comments" | "followers" | "following" | "peopleConnect"
  > {}

const Explore: React.FC<propsTypes> = ({ currentUser }) => {
  React.useEffect(() => {
    document.title = privateRoutes.explore.title;
  }, []);

  return (
    <>
      <main className="main">
        <div className="Explore main-container">
          <section className="sec-header sticky-2">
            <SectionHeaderTweet
              page={privateRoutes.explore.name}
              title="Latest Tweets"
              currentUser={currentUser}
            />
          </section>
          <section className="content-container">
            <div className="picsum">
              <img src="https://picsum.photos/600/300" alt="picsum" />
            </div>
            <div className="trends-container">
              <div className="content">
                <h3>Trends for you</h3>
                {dataTrends.map((trend, i) => (
                  <Trending key={i} subject={trend.subject} title={trend.title} numTweet={trend.numTweet} />
                ))}
              </div>
            </div>
          </section>
        </div>
        <Aside page={privateRoutes.explore.name} />
      </main>
      <ButtonAddTweet nameClass="add-tweet-global" />
    </>
  );
};

const ExploreConnectWithStore: React.FC<propsTypes> = ({ currentUser }) => {
  return (
    <Layout>
      <Explore currentUser={currentUser} />
    </Layout>
  );
};

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
});

export default connect(mapStateToProps, {})(ExploreConnectWithStore);
