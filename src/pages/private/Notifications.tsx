import React from "react";

import Layout from "@/components/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import NavTabs from "@/widgets/NavTabs";
import CardNotif from "@/components/notification/CardNotif";
import ButtonAddTweet from "@/components/navbar/ButtonAddTweet";
import Aside from "@/components/aside/Aside";
import { privateRoutes } from "@/routes/private.routes";
import { connect } from "react-redux";
import { IRootState, TTabState, IPropsRootStateType } from "@/models";
import { INotif } from "../../models/notificationAndChat";
import getAllUsersAction from "@/actions/user/getAllUsers.action";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import getNotificationAction from '@/actions/notification/getNotification.action';

interface propsTypes
  extends Omit<
    IPropsRootStateType,
    "posts" | "postsLikes" | "comments" | "followers" | "following" | "peopleConnect"
  > {
  notifications: INotif[] | null;
  getAllUsersAction: () => void;
  getNotificationAction: () => void;
}

const styleSpinnersLoding: React.CSSProperties = {
  width: "auto",
};

const Notifications: React.FC<propsTypes> = ({ currentUser, users, notifications, getAllUsersAction, getNotificationAction }) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [activeTab, setActiveTab] = React.useState(1);
  const flag = React.useRef(false);
  const tabState: TTabState[] = [
    { id: 1, title: "All", grow: false },
    { id: 2, title: "Montions", grow: false },
  ];

  const toggleTab = (id: number) => {
    setActiveTab(id);
  };

  React.useEffect(() => {
    document.title = privateRoutes.notifications.title;

    if (!flag.current) {
      getAllUsersAction();
      getNotificationAction();
      flag.current = true;
    }

    if (notifications && users && notifications) setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag, currentUser, users, notifications]);

  return loading ? (
    <>
      <main className="main">
        <SpinnersLoding isLoading={loading} styleSpinnersLoding={styleSpinnersLoding} />
        <aside className="aside"></aside>
      </main>
    </>
  ) : (
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
              {users && notifications && notifications.map((n, i) => (
                <CardNotif key={i} fromUser={users.filter((u) => u.user.public_id === n.fromId)[0]} />
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

const NotificationsConnectWithStore: React.FC<propsTypes> = ({
  currentUser,
  users,
  notifications,
  getAllUsersAction,
  getNotificationAction,
}) => {
  return (
    <Layout>
      <Notifications
        currentUser={currentUser}
        users={users}
        notifications={notifications}
        getAllUsersAction={getAllUsersAction}
        getNotificationAction={getNotificationAction}
      />
    </Layout>
  );
};

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
  users: state.userReducer,
  notifications: state.notificationReducer,
});

export default connect(mapStateToProps, { getAllUsersAction, getNotificationAction })(NotificationsConnectWithStore);
