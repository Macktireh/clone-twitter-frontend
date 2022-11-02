import React from "react";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import NavTabs from "@/widgets/NavTabs";
import CardNotif from "@/components/notification/CardNotif";
import ButtonAddTweet from "@/components/navbar/ButtonAddTweet";
import Aside from "@/components/aside/Aside";
import { privateRoutes } from "@/routes/private.routes";
import { connect } from "react-redux";
import { IRootState, TTabState, IPropsRootStateType } from "@/models";

interface propsTypes
  extends Omit<
    IPropsRootStateType,
    "users" | "posts" | "postsLikes" | "comments" | "followers" | "following" | "peopleConnect"
  > {}

const Notifications: React.FC<propsTypes> = ({ currentUser }) => {
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
            <SectionHeaderTweet
              page={privateRoutes.notifications.name}
              title="Notifications"
              currentUser={currentUser}
            />
            <nav>
              <NavTabs listTabs={tabState} activeTab={activeTab} toggleTab={toggleTab} linkActive={false} />
            </nav>
          </section>
          {activeTab === 1 ? (
            <div className="all-notif">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n, i) => (
                <CardNotif key={i} />
              ))}
            </div>
          ) : (
            <div className="montions">
              <h3>Nothing to see here — yet</h3>
              <p>When someone mentions you, you’ll find it here.</p>
            </div>
          )}
        </div>
        <Aside page={privateRoutes.notifications.name} />
      </main>
      <ButtonAddTweet nameClass="add-tweet-global" />
    </>
  );
};

const NotificationsConnectWithStore: React.FC<propsTypes> = ({ currentUser }) => {
  return (
    <Layout>
      <Notifications currentUser={currentUser} />
    </Layout>
  );
};

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
});

export default connect(mapStateToProps, {})(NotificationsConnectWithStore);
