import React from "react";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/tweets/SectionHeaderTweet";
import { tweetRoutes } from "@/routes/tweet.routes";
import { connect } from "react-redux";
import { IAuthUserProfile, TAuthUserReducer } from "@/models";
import ButtonCustom from "@/components/widgets/ButtonCustom";

type Props = { currentUser: IAuthUserProfile | null };

const Messages: React.FC<Props> = () => {
  React.useEffect(() => {
    document.title = tweetRoutes.messages.title;

    window.addEventListener("scroll", () => {
      const secHeaderBg: HTMLElement | null = document.querySelector(".sec-header");
      secHeaderBg?.classList.toggle("sticky-2", window.scrollY > 0);
    });
  });

  return (
    <>
      <main className="main main-messages">
        <div className="main-container message inbox">
          <section className="sec-header">
            <SectionHeaderTweet page={tweetRoutes.messages.name} title="Messages" />
          </section>
          <div className="inbox-container">
            <div className="not-msg">
              <h2>Welcome to your inbox!</h2>
              <p>
                Drop a line, share Tweets and more with private conversations between you and others on
                Twitter.
              </p>
              <ButtonCustom text="Write a message" />
            </div>
          </div>
        </div>
        <div className="chatrom">
          <div className="not-msg">
            <h2>Select a message</h2>
            <p>
              Choose from your existing conversations, start a <br /> new one, or just keep swimming.
            </p>
            <ButtonCustom text="New message" />
          </div>
        </div>
      </main>
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
