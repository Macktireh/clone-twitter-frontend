import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import IconSVG from "@/widgets/IconSVG";
import { privateRoutes } from "@/routes/private.routes";
import { INotif, IRootState, IUserProfile } from "@/models";

type propsTypes = {
  currentUser: IUserProfile | null;
  notification: INotif[] | null;
};

const NavbarMobile: React.FC<propsTypes> = ({ currentUser, notification }) => {
  const [active, setActive] = React.useState("");

  const handleActive = (active: string): string => {
    setActive(active);
    return "nav-link";
  };

  return (
    <nav className="nav-mobile">
      <div className="nav-list">
        <NavLink
          end
          to={privateRoutes.home.path}
          className={(nav) => (nav.isActive ? handleActive("home") : "nav-link")}
        >
          <IconSVG iconName={active === "home" ? "homeActive" : "home"} />
        </NavLink>

        <NavLink
          end
          to={privateRoutes.explore.path}
          className={(nav) => (nav.isActive ? handleActive("explore") : "nav-link")}
        >
          <IconSVG iconName={active === "explore" ? "exploreActive" : "explore"} nameClass="explore" />
        </NavLink>

        <NavLink
          end
          to={privateRoutes.notifications.path}
          className={(nav) => (nav.isActive ? handleActive("notification") : "nav-link")}
        >
          <IconSVG iconName={active === "notification" ? "notificationActive" : "notification"} />
          {notification && notification.filter((n) => n.seen === false).length > 0 && (
            <div className="info-notif">{notification.filter((n) => n.seen === false).length}</div>
          )}
        </NavLink>

        <NavLink
          end
          to={privateRoutes.messages.path}
          className={(nav) => (nav.isActive ? handleActive("message") : "nav-link")}
        >
          <IconSVG iconName={active === "message" ? "messageActive" : "message"} />
        </NavLink>
      </div>
    </nav>
  );
};

const NavbarMobileConnectWithStore: React.FC<propsTypes> = ({ currentUser, notification }) => {
  return <NavbarMobile currentUser={currentUser} notification={notification} />;
};

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
  notification: state.notificationReducer.notifications,
});

export default connect(mapStateToProps, {})(NavbarMobileConnectWithStore);
