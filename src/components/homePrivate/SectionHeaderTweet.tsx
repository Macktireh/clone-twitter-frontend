import React from "react";
import { useNavigate } from "react-router-dom";

import InputSearch from "@/widgets/InputSearch";
import IconSVG from "@/widgets/IconSVG";
import { privateRoutes } from "@/routes/private.routes";
import { IUserProfile } from "@/models/userProfile";
import { useNavbarContext } from "@/context/NavbarProvider";

type propsTypes = {
  page: string;
  title: string;
  subtitle?: string;
  currentUser?: IUserProfile | null;
};

type showIconTypes =
  | {
      name: string;
      icon: JSX.Element;
    }[]
  | undefined;

const SectionHeaderTweet: React.FC<propsTypes> = ({ page, title, subtitle, currentUser }) => {
  const propsContext = useNavbarContext();
  const navigate = useNavigate();

  const handleClick = () => propsContext?.displayNavLeft.setNavLeft();

  const showIcon = (page: string): showIconTypes => {
    if (page === privateRoutes.home.name) return [{ name: "etoil", icon: <IconSVG iconName="etoil" /> }];
    else if (page === privateRoutes.explore.name)
      return [{ name: "settings", icon: <IconSVG iconName="settings" /> }];
    else if (page === privateRoutes.notifications.name)
      return [{ name: "settings", icon: <IconSVG iconName="settings" /> }];
    else if (page === privateRoutes.bookmarks.name)
      return [{ name: "3-dot", icon: <IconSVG iconName="3-dot" /> }];
    else if (page === privateRoutes.messages.name)
      return [
        { name: "settings", icon: <IconSVG iconName="settings" /> },
        { name: "msg", icon: <IconSVG iconName="msg" /> },
      ];
    else if (page === privateRoutes.lists.name)
      return [
        { name: "lists-plus", icon: <IconSVG iconName="lists-plus" /> },
        { name: "3-dot", icon: <IconSVG iconName="3-dot" /> },
      ];
  };

  return (
    <div className="SectionHeaderTweet">
      {(page === privateRoutes.home.name ||
        page === privateRoutes.explore.name ||
        page === privateRoutes.notifications.name ||
        page === privateRoutes.messages.name ||
        page === privateRoutes.bookmarks.name) && (
        <div className="profile-pic-top" onClick={handleClick}>
          <img src={currentUser?.profilePicture as string} alt="" />
        </div>
      )}
      {(page === privateRoutes.lists.name ||
        page === privateRoutes.profile.name ||
        page === privateRoutes.postDetails.name) && (
        <div className="left">
          <div className="back" onClick={() => navigate(-1)}>
            <IconSVG iconName="back" />
          </div>
        </div>
      )}
      <div className="center">
        {page === privateRoutes.explore.name ? (
          <InputSearch suggestion={true}  />
        ) : (
          <div className={page === privateRoutes.explore.name ? "centent notif" : "centent"}>
            <strong>{title}</strong>
            {(page === privateRoutes.profile.name || page === privateRoutes.bookmarks.name || page === privateRoutes.lists.name) && (
              <span>{subtitle}</span>
            )}
          </div>
        )}
      </div>
      {page === privateRoutes.profile.name ? null : (
        <div className="right">
          {showIcon(page)?.map(
            (obj, index) =>
              obj && (
                <div
                  key={index}
                  className={
                    obj.name === "msg" || obj.name === "lists-plus"
                      ? "icon-container no-mobile"
                      : "icon-container"
                  }
                >
                  {obj.icon}
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default SectionHeaderTweet;

// className={
//   page === privateRoutes.lists.name || page === privateRoutes.messages.name
//     ? "right two-icon"
//     : "right"
// }
