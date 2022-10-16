import React from "react";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import Aside from "@/components/aside/Aside";
import { privateRoutes } from "@/routes/private.routes";
import { connect } from "react-redux";
import { IUserProfile, IRootState } from "@/models";
import ButtonAddTweet from "@/components/navbar/ButtonAddTweet";

type propsTypes = { currentUser: IUserProfile | null };

const Explore: React.FC<propsTypes> = ({ currentUser }) => {
  return (
    <>
      <main className="main">
        <div className="main-container">
          <section className="sec-header sticky-2">
            <SectionHeaderTweet page={privateRoutes.explore.name} title="Latest Tweets" currentUser={currentUser} />
          </section>
          <div>Explore</div>
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
