import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Tippy from "@tippyjs/react";

import IconSVG from "@/widgets/IconSVG";
import UserCard from "@/components/navbar/UserCard";
import PopupLogout from "@/components/auth/PopupLogout";
import ButtonAddTweet from "@/components/navbar/ButtonAddTweet";
import { privateRoutes } from "@/routes/private.routes";
import { IUserProfile, IRootState } from "@/models";
import { pathLinkProfile } from "@/utils/pathRoute";

type propsTypes = { currentUser: IUserProfile | null };

const Navbar: React.FC<propsTypes> = ({ currentUser }) => {
  const [active, setActive] = React.useState("");

  const handleActive = (active: string): string => {
    setActive(active);
    return "nav-link";
  };

  return (
    <nav className="nav">
      <div className="nav-content">
        <div className="nav-logo">
          <NavLink end to={privateRoutes.home.path}>
            <img src="/static/svg/twitter.svg" alt="logo" />
          </NavLink>
        </div>
        <div className="nav__list">
          <NavLink
            end
            to={privateRoutes.home.path}
            className={(nav) => (nav.isActive ? handleActive("home") : "nav-link")}
          >
            <IconSVG iconName={active === "home" ? "homeActive" : "home"} />
            <span className={active === "home" ? "active" : ""}>Home</span>
          </NavLink>

          <NavLink
            end
            to={privateRoutes.explore.path}
            className={(nav) => (nav.isActive ? handleActive("explore") : "nav-link")}
          >
            <IconSVG iconName={active === "explore" ? "exploreActive" : "explore"} nameClass="explore" />
            <IconSVG iconName={active === "explore" ? "#Active" : "#"} nameClass="htag" />
            <span className={active === "explore" ? "active" : ""}>Explore</span>
          </NavLink>

          <NavLink
            end
            to={privateRoutes.notifications.path}
            className={(nav) => (nav.isActive ? handleActive("notification") : "nav-link")}
          >
            <IconSVG iconName={active === "notification" ? "notificationActive" : "notification"} />
            <span className={active === "notification" ? "active" : ""}>Notifications</span>
          </NavLink>

          <NavLink
            end
            to={privateRoutes.messages.path}
            className={(nav) => (nav.isActive ? handleActive("message") : "nav-link")}
          >
            <IconSVG iconName={active === "message" ? "messageActive" : "message"} />
            <span className={active === "message" ? "active" : ""}>Messages</span>
          </NavLink>

          <NavLink
            end
            to={privateRoutes.bookmarks.path}
            className={(nav) => (nav.isActive ? handleActive("bookmark") : "nav-link")}
          >
            <IconSVG iconName={active === "bookmark" ? "bookmarkActive" : "bookmark"} />
            <span className={active === "bookmark" ? "active" : ""}>Bookmarks</span>
          </NavLink>

          <NavLink
            end
            to={privateRoutes.lists.path}
            className={(nav) => (nav.isActive ? handleActive("list") : "nav-link")}
          >
            <IconSVG iconName={active === "list" ? "listActive" : "list"} />
            <span className={active === "list" ? "active" : ""}>Lists</span>
          </NavLink>

          <NavLink
            end
            to={currentUser ? pathLinkProfile(currentUser.pseudo) : ""}
            className={(nav) => (nav.isActive ? handleActive("profile") : "nav-link")}
          >
            <IconSVG iconName={active === "profile" ? "profileActive" : "profile"} />
            <span className={active === "profile" ? "active" : ""}>Profile</span>
          </NavLink>

          <div className="nav-link" onClick={() => console.log("Show More")}>
            <IconSVG iconName="more" />
            <span>More</span>
          </div>
        </div>

        <ButtonAddTweet />
      </div>

      <Tippy
        content={<PopupLogout currentUser={currentUser} />}
        interactive={true}
        trigger="click"
        delay={0}
        placement="top-end"
      >
        <div className="nav-user-container">
          <UserCard currentUser={currentUser} nameClass="nav-user">
            <IconSVG iconName="3-dot" />
          </UserCard>
        </div>
      </Tippy>
    </nav>
  );
};

const NavbarConnectWithStore: React.FC<propsTypes> = ({ currentUser }) => {
  return (
    <>
      <Navbar currentUser={currentUser} />
    </>
  );
};

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
});

export default connect(mapStateToProps, {})(NavbarConnectWithStore);
