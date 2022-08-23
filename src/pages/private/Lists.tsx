import React from "react";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/tweets/SectionHeaderTweet";
import { tweetRoutes } from "@/routes/tweet.routes";
import { connect } from "react-redux";
import { IAuthUserProfile, TAuthUserReducer } from "@/models";
import Aside from "@/components/tweets/Aside";

type Props = { currentUser: IAuthUserProfile | null };

const Lists: React.FC<Props> = () => {
  return (
    <>
      <main className="main">
        <div className="main-container">
          <section className="sec-header">
            <SectionHeaderTweet page={tweetRoutes.lists.name} title="Lists" />
          </section>
          <div>Lists</div>
        </div>
      </main>
      <Aside page={tweetRoutes.lists.name} />
    </>
  );
};


const ListsConnectWithStore: React.FC<Props> = ({ currentUser }) => {
  return (
    <Layout>
      <Lists currentUser={currentUser} />
    </Layout>
  );
};

const mapStateToProps = (state: TAuthUserReducer) => ({
  currentUser: state.userReducer.currentUser,
});

export default connect(mapStateToProps, {})(ListsConnectWithStore);