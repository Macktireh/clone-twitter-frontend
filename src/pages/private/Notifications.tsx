import React from "react";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import NavTabs from "@/widgets/NavTabs";
import Aside from "@/components/aside/Aside";
import { privateRoutes } from "@/routes/private.routes";
import { connect } from "react-redux";
import { IAuthUserProfile, IStateReduce, TTabState } from "@/models";
import CardNotif from "@/components/notification/CardNotif";

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
    document.title = privateRoutes.notifications.title;

    window.addEventListener("scroll", () => {
      const secHeaderBg: HTMLElement | null = document.querySelector(".sec-header");
      secHeaderBg?.classList.toggle("sticky-2", window.scrollY > 0);
    });
  });

  return (
    <>
      <main className="main">
        <div className="Notifications main-container">
          <section className="sec-header sticky-2">
            <SectionHeaderTweet page={privateRoutes.notifications.name} title="Notifications" />
            <nav>
              <NavTabs listTabs={tabState} activeTab={activeTab} toggleTab={toggleTab} />
            </nav>
          </section>
          {activeTab === 1 ? (
            <div className="all-notif">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <CardNotif />
              ))}
            </div>
          ) : (
            <div className="montions">
              <h3>Nothing to see here — yet</h3>
              <p>When someone mentions you, you’ll find it here.</p>
            </div>
          )}
        </div>
      </main>
      <Aside page={privateRoutes.notifications.name} />
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

const mapStateToProps = (state: IStateReduce) => ({
  currentUser: state.authReducer.currentUser,
});

export default connect(mapStateToProps, {})(NotificationsConnectWithStore);
