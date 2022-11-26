import React from "react";

import Layout from "@/components/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import { privateRoutes } from "@/routes/private.routes";
import { connect } from "react-redux";
import { IRootState, IPropsRootStateType } from "@/models";
import ButtonCustom from "@/widgets/ButtonCustom";

interface propsTypes
  extends Omit<
    IPropsRootStateType,
    "users" | "posts" | "postsLikes" | "comments" | "followers" | "following" | "peopleConnect"
  > {}

const Messages: React.FC<propsTypes> = ({ currentUser }) => {
  React.useEffect(() => {
    document.title = privateRoutes.messages.title;

    window.addEventListener("scroll", () => {
      const secHeaderBg: HTMLElement | null = document.querySelector(".sec-header");
      secHeaderBg?.classList.toggle("sticky-2", window.scrollY > 0);
    });
  });

  return (
    <main className="main main-messages">
      <div className="main-container message inbox">
        <section className="sec-header sticky-2">
          <SectionHeaderTweet page={privateRoutes.messages.name} title="Messages" currentUser={currentUser} />
        </section>
        <div className="inbox-container">
          <div className="not-msg">
            <h2>Welcome to your inbox!</h2>
            <p>
              Drop a line, share Tweets and more with private conversations between you and others on Twitter.
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
  );
};

const MessagesConnectWithStore: React.FC<propsTypes> = ({ currentUser }) => {
  return (
    <Layout>
      <Messages currentUser={currentUser} />
    </Layout>
  );
};

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
});

export default connect(mapStateToProps, {})(MessagesConnectWithStore);
