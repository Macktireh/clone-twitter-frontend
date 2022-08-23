import React from "react";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/tweets/SectionHeaderTweet";
import Aside from "@/components/tweets/Aside";
import { tweetRoutes } from "@/routes/tweet.routes";
import { connect } from "react-redux";
import { IAuthUserProfile, TAuthUserReducer } from "@/models";

type Props = { currentUser: IAuthUserProfile | null };

const Messages: React.FC<Props> = () => {
  return (
    <>
      <main className="main">
        <div className="main-container">
          <section className="sec-header">
            <SectionHeaderTweet page={tweetRoutes.messages.name} title="Messages" />
          </section>
          <div>Messages</div>
        </div>
      </main>
      <Aside page={tweetRoutes.messages.name} />
    </>
  );
};


const MessagesConnectWithStore: React.FC<Props> = ({ currentUser }) => {
  return (
    <Layout>
      <Messages currentUser={currentUser} />
    </Layout>
  );
};

const mapStateToProps = (state: TAuthUserReducer) => ({
  currentUser: state.userReducer.currentUser,
});

export default connect(mapStateToProps, {})(MessagesConnectWithStore);