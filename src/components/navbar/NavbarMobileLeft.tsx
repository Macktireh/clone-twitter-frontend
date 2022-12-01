import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import IconSVG from "@/widgets/IconSVG";
import SimpleCardUser from "@/widgets/SimpleCardUser";
import logoutAction from "@/actions/auth/logout.action";
import { IRootState, IUserProfile } from "@/models";
import { privateRoutes } from "@/routes/private.routes";
import { pathLinkProfile } from "@/utils/pathRoute";
import { useNavbarContext } from "@/context/NavbarProvider";

type ContextPropsType = {
  displayNavLeft: { navLeft: boolean; setNavLeft: () => void };
};

type PropsTypes = {
  currentUser: IUserProfile | null;
  propsContext: ContextPropsType | null;
  dispatch: any;
};

const NavbarMobileLeft: React.FC<PropsTypes> = ({ currentUser, propsContext, dispatch }) => {
  const handleCloseNavLeft = () => propsContext?.displayNavLeft.setNavLeft();

  const handleLogout = () => {
    dispatch && dispatch(logoutAction(currentUser?.user.public_id as string));
  };

  return (
    <div
      className="navLeft-container"
      style={{ transform: propsContext?.displayNavLeft.navLeft ? "translateX(0)" : "translateX(-100%)" }}
    >
      <div className="closed" onClick={handleCloseNavLeft}></div>
      <nav
        className="nav-mobile-left"
        style={{ transform: propsContext?.displayNavLeft.navLeft ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="nav-header">
          <h4>Account info</h4>
          <div className="close-btn">
            <img src="/static/svg/close.svg" alt="" onClick={handleCloseNavLeft} />
          </div>
        </div>
        <div className="nav-card-user">
          <SimpleCardUser userData={currentUser} bio={false}>
            <div className="plus">
              <IconSVG iconName="plus" />
            </div>
          </SimpleCardUser>
        </div>
        <div className="nav-items">
          <Link to={currentUser ? pathLinkProfile(currentUser.pseudo) : ""} className="nav-link">
            <IconSVG iconName="profile" />
            <span>Profile</span>
          </Link>
          <Link to="" className="nav-link">
            <IconSVG iconName="topic" />
            <span>Topics</span>
          </Link>
          <Link to={privateRoutes.bookmarks.path} className="nav-link">
            <IconSVG iconName="bookmark" />
            <span>Bookmark</span>
          </Link>
          <Link to={privateRoutes.lists.path} className="nav-link">
            <IconSVG iconName="list" />
            <span>Lists</span>
          </Link>
          <Link to={privateRoutes.peopleConnect.path} className="nav-link">
            <IconSVG iconName="twitterCircle" />
            <span>People</span>
          </Link>
          <div className="nav-link" onClick={handleLogout}>
            <IconSVG iconName="logout" />
            <span>Logout</span>
          </div>
        </div>
        <div className="line"></div>
        <div className="nav-footer"></div>
      </nav>
    </div>
  );
};

const NavbarMobileLeftConnectWithStore: React.FC = () => {
  const currentUser = useSelector((state: IRootState) => state.authReducer.currentUser);
  const propsContext = useNavbarContext();
  const dispatch = useDispatch();
  return (
    <NavbarMobileLeft currentUser={currentUser} propsContext={propsContext} dispatch={dispatch as any} />
  );
};

export default NavbarMobileLeftConnectWithStore;
