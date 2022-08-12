import * as React from "react";
import { NavLink } from "react-router-dom";

import { tweetRoutes } from "@/routes/tweet.routes";
import IconSVG from "@/components/IconSVG";

const Navbar: React.FC = () => {
  const [active, setActive] = React.useState("");

  const handleActive = (active: string): string => {
    setActive(active);
    return "nav-link";
  };

  return (
    <nav className="nav">
      <div className="nav-content">
        <div className="nav-logo">
          <NavLink to={tweetRoutes.home.path}>
            <img src="/static/svg/twitter.svg" alt="logo" />
          </NavLink>
        </div>
        <div className="nav__list">
          <NavLink
            to={tweetRoutes.home.path}
            className={(nav) => (nav.isActive ? handleActive("home") : "nav-link")}
          >
            {active === "home" ? <IconSVG iconName="homeActive" /> : <IconSVG iconName="home" />}
            <span className={active === "home" ? "active" : ""}>Home</span>
          </NavLink>

          <NavLink to="/" className={(nav) => (nav.isActive ? handleActive("explore") : "nav-link")}>
            {active === "explore" ? <IconSVG iconName="exploreActive" /> : <IconSVG iconName="explore" />}
            <span className={active === "explore" ? "active" : ""}>Explore</span>
          </NavLink>

          <NavLink to="/" className={(nav) => (nav.isActive ? handleActive("notification") : "nav-link")}>
            {active === "notification" ? (
              <IconSVG iconName="notificationActive" />
            ) : (
              <IconSVG iconName="notification" />
            )}
            <span className={active === "notification" ? "active" : ""}>Notifications</span>
          </NavLink>

          <NavLink to="/" className={(nav) => (nav.isActive ? handleActive("message") : "nav-link")}>
            {active === "message" ? <IconSVG iconName="messageActive" /> : <IconSVG iconName="message" />}
            <span className={active === "message" ? "active" : ""}>Messages</span>
          </NavLink>

          <NavLink to="/" className={(nav) => (nav.isActive ? handleActive("bookmark") : "nav-link")}>
            {active === "bookmark" ? <IconSVG iconName="bookmarkActive" /> : <IconSVG iconName="bookmark" />}
            <span className={active === "bookmark" ? "active" : ""}>Bookmarks</span>
          </NavLink>

          <NavLink to="/" className={(nav) => (nav.isActive ? handleActive("list") : "nav-link")}>
            {active === "list" ? <IconSVG iconName="listActive" /> : <IconSVG iconName="list" />}
            <span className={active === "list" ? "active" : ""}>Lists</span>
          </NavLink>

          <NavLink to="/" className={(nav) => (nav.isActive ? handleActive("profile") : "nav-link")}>
            {active === "profile" ? <IconSVG iconName="profileActive" /> : <IconSVG iconName="profile" />}
            <span className={active === "profile" ? "active" : ""}>Profile</span>
          </NavLink>

          <NavLink to="/" className="nav-link">
            <IconSVG iconName="more" />
            <span>More</span>
          </NavLink>
        </div>
        <div className="add-tweet">
          <IconSVG iconName="add-tweet" />
          <span>Tweet</span>
        </div>
      </div>

      <div className="nav-user">
        <img src="/static/svg/user.svg" alt="" />

        <div className="username">
          <strong>Macktireh Abdi Soubaneh</strong>
          <p>@macktireh</p>
        </div>
        <IconSVG iconName="point" />
      </div>
    </nav>
  );
};

export default Navbar;
