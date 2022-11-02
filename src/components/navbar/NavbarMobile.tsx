import React from "react";
import { NavLink } from "react-router-dom";

import IconSVG from "@/widgets/IconSVG";

import { privateRoutes } from "@/routes/private.routes";

const NavbarMobile: React.FC = () => {
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

export default NavbarMobile;
