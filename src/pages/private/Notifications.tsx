import React from "react";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/tweets/SectionHeaderTweet";
import NavTabs from "@/components/widgets/NavTabs";
import Aside from "@/components/tweets/Aside";
import { tweetRoutes } from "@/routes/tweet.routes";
import { connect } from "react-redux";
import { IAuthUserProfile, TAuthUserReducer, TTabState } from "@/models";
import CardNotif from "@/components/tweets/CardNotif";

type Props = { currentUser: IAuthUserProfile | null };

const Notifications: React.FC<Props> = () => {
  const tabState: TTabState[] = [
    { id: 1, title: "All", grow: false },
    { id: 2, title: "Montions", grow: false },
  ];
  const [activeTab, setActiveTab] = React.useState(1);

  const toggleTab = (id: number) => {
    setActiveTab(id);
  };

  React.useEffect(() => {
    document.title = tweetRoutes.notifications.title;

    window.addEventListener("scroll", () => {
      const secHeaderBg: HTMLElement | null = document.querySelector(".sec-header");
      secHeaderBg?.classList.toggle("sticky-2", window.scrollY > 0);
    });
  });

  return (
    <>
      <main className="main">
        <div className="Notifications main-container">
          <section className="sec-header">
            <SectionHeaderTweet page={tweetRoutes.notifications.name} title="Notifications" />
            <nav>
              <NavTabs listTabs={tabState} activeTab={activeTab} toggleTab={toggleTab} />
            </nav>
          </section>
          {activeTab === 1 ? (
            <div className="all-notif">
              {[1,2,3,4,5,6,7,8,9,10].map(n => <CardNotif />)}
            </div>
          ) : (
            <div className="montions">
              <h3>Nothing to see here — yet</h3>
              <p>When someone mentions you, you’ll find it here.</p>
            </div>
          )}
        </div>
      </main>
      <Aside page={tweetRoutes.notifications.name} />
    </>
  );
};

const NotificationsConnectWithStore: React.FC<Props> = ({ currentUser }) => {
  return (
    <Layout>
      <Notifications currentUser={currentUser} />
    </Layout>
  );
};

const mapStateToProps = (state: TAuthUserReducer) => ({
  currentUser: state.userReducer.currentUser,
});

export default connect(mapStateToProps, {})(NotificationsConnectWithStore);
