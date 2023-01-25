import React from "react";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import NoMessage from "@/components/messages/NoMessage";
import { privateRoutes } from "@/routes/private.routes";
import { IRootState, IPropsRootStateType } from "@/models";
import SearchPeople from "@/components/messages/SearchPeople";

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
          <SearchPeople />
          <NoMessage
            h2="Welcome to your inbox!"
            p="Drop a line, share Tweets and more with private conversations between you and others on Twitter."
            textBtn="Write a message"
          />
        </div>
      </div>
      <div className="chatrom">
        <NoMessage
          h2="Select a message"
          p="Choose from your existing conversations, start a new one, or just keep swimming."
          textBtn="New message"
        />
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
