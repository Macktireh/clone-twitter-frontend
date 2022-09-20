import React from "react";
import { NavLink } from "react-router-dom";
import Tippy from "@tippyjs/react";

import IconSVG from "@/widgets/IconSVG";
import UserCard from "@/components/navbar/UserCard";
import PopupLogout from "@/components/auth/PopupLogout";
import { privateRoutes } from "@/routes/private.routes";
import { IAuthUserProfile, IStateReduce } from "@/models";
import { connect } from "react-redux";

type TcurrentUser = { currentUser: IAuthUserProfile | null };

const Navbar: React.FC<TcurrentUser> = ({ currentUser }) => {
  const [active, setActive] = React.useState("");

  const handleActive = (active: string): string => {
    setActive(active);
    return "nav-link";
  };

  return (
    <nav className="nav">
      <div className="nav-content">
        <div className="nav-logo">
          <NavLink to={privateRoutes.home.path}>
            <img src="/static/svg/twitter.svg" alt="logo" />
          </NavLink>
        </div>
        <div className="nav__list">
          <NavLink
            to={privateRoutes.home.path}
            className={(nav) => (nav.isActive ? handleActive("home") : "nav-link")}
          >
            {active === "home" ? <IconSVG iconName="homeActive" /> : <IconSVG iconName="home" />}
            <span className={active === "home" ? "active" : ""}>Home</span>
          </NavLink>

          <NavLink
            to={privateRoutes.explore.path}
            className={(nav) => (nav.isActive ? handleActive("explore") : "nav-link")}
          >
            {active === "explore" ? (
              <>
                <IconSVG iconName="exploreActive" nameClass="explore" />
                <IconSVG iconName="#Active" nameClass="htag" />
              </>
            ) : (
              <>
                <IconSVG iconName="explore" nameClass="explore" />
                <IconSVG iconName="#" nameClass="htag" />
              </>
            )}
            <span className={active === "explore" ? "active" : ""}>Explore</span>
          </NavLink>

          <NavLink
            to={privateRoutes.notifications.path}
            className={(nav) => (nav.isActive ? handleActive("notification") : "nav-link")}
          >
            {active === "notification" ? (
              <IconSVG iconName="notificationActive" />
            ) : (
              <IconSVG iconName="notification" />
            )}
            <span className={active === "notification" ? "active" : ""}>Notifications</span>
          </NavLink>

          <NavLink
            to={privateRoutes.messages.path}
            className={(nav) => (nav.isActive ? handleActive("message") : "nav-link")}
          >
            {active === "message" ? <IconSVG iconName="messageActive" /> : <IconSVG iconName="message" />}
            <span className={active === "message" ? "active" : ""}>Messages</span>
          </NavLink>

          <NavLink
            to={privateRoutes.bookmarks.path}
            className={(nav) => (nav.isActive ? handleActive("bookmark") : "nav-link")}
          >
            {active === "bookmark" ? <IconSVG iconName="bookmarkActive" /> : <IconSVG iconName="bookmark" />}
            <span className={active === "bookmark" ? "active" : ""}>Bookmarks</span>
          </NavLink>

          <NavLink
            to={privateRoutes.lists.path}
            className={(nav) => (nav.isActive ? handleActive("list") : "nav-link")}
          >
            {active === "list" ? <IconSVG iconName="listActive" /> : <IconSVG iconName="list" />}
            <span className={active === "list" ? "active" : ""}>Lists</span>
          </NavLink>

          <NavLink
            to={privateRoutes.profile.path}
            className={(nav) => (nav.isActive ? handleActive("profile") : "nav-link")}
          >
            {active === "profile" ? <IconSVG iconName="profileActive" /> : <IconSVG iconName="profile" />}
            <span className={active === "profile" ? "active" : ""}>Profile</span>
          </NavLink>

          {/* <Tippy
            content={<PopupLogout currentUser={currentUser} />}
            interactive={true}
            trigger="click"
            delay={0}
            placement="top-end"
          > */}
          <div className="nav-link" onClick={() => console.log("Show More")}>
            <IconSVG iconName="more" />
            <span>More</span>
          </div>
          {/* </Tippy> */}
        </div>
        <div className="add-tweet">
          <IconSVG iconName="add-tweet" />
          <span>Tweet</span>
        </div>
      </div>

      <Tippy
        content={<PopupLogout currentUser={currentUser} />}
        interactive={true}
        trigger="click"
        delay={0}
        placement="top-end"
      ><div className="nav-user-container">

        <UserCard currentUser={currentUser} nameClass="nav-user">
          <IconSVG iconName="3-dot" />
        </UserCard>
      </div>
      </Tippy>
      {/* <div className="nav-user" data-tip="custom show" data-event="click focus">
          <div className="img-and-name">
            <img
              src={
                currentUser?.profilePicture
                  ? baseURL + currentUser.profilePicture
                  : baseURL + "/mediafiles/default/profilePic.png"
              }
              alt="profilePicture"
            />
            <div className="username">
              <strong>
                {currentUser?.user.first_name} {currentUser?.user.last_name}
              </strong>
              <p>@{currentUser?.pseudo}</p>
            </div>
          </div>
          <IconSVG iconName="3-dot" />
        </div> */}
    </nav>
  );
};

const NavbarConnectWithStore: React.FC<any> = ({ currentUser }) => {
  return (
    <>
      <Navbar currentUser={currentUser} />
    </>
  );
};

const mapStateToProps = (state: IStateReduce) => ({
  currentUser: state.authReducer.currentUser,
});

export default connect(mapStateToProps, {})(NavbarConnectWithStore);
