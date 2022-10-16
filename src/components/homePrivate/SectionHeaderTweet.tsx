import React from "react";

import IconSVG from "@/widgets/IconSVG";
import { privateRoutes } from "@/routes/private.routes";
import { Link } from "react-router-dom";
import InputSearch from "@/widgets/InputSearch";
import { IUserProfile } from "../../models/userProfile";
import { useNavbarContext } from "@/context/CommentProvider";

type propsTypes = {
  page: string;
  title: string;
  subtitle?: string;
  currentUser?: IUserProfile | null;
};

const SectionHeaderTweet: React.FC<propsTypes> = ({ page, title, subtitle, currentUser }) => {
  const propsContext = useNavbarContext();

  const handleClick = () => propsContext?.displayNavLeft.setNavLeft();

  const showIcon = (page: string): JSX.Element[] | undefined => {
    if (page === privateRoutes.home.name) return [<IconSVG iconName="etoil" />];
    else if (page === privateRoutes.explore.name) return [<IconSVG iconName="settings" />];
    else if (page === privateRoutes.notifications.name) return [<IconSVG iconName="settings" />];
    else if (page === privateRoutes.bookmarks.name) return [<IconSVG iconName="3-dot" />];
    else if (page === privateRoutes.messages.name)
      return [<IconSVG iconName="settings" />, <IconSVG iconName="msg" />];
    else if (page === privateRoutes.lists.name)
      return [<IconSVG iconName="lists-plus" />, <IconSVG iconName="3-dot" />];
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
          <Link to={privateRoutes.home.path}>
            <IconSVG iconName="back" />
          </Link>
        </div>
      )}
      <div className="center">
        {page === privateRoutes.explore.name ? (
          <InputSearch />
        ) : (
          <div className={page === privateRoutes.explore.name ? "centent notif" : "centent"}>
            <strong>{title}</strong>
            {(page === privateRoutes.profile.name || page === privateRoutes.bookmarks.name) && (
              <span>{subtitle}</span>
            )}
          </div>
        )}
      </div>
      {page === privateRoutes.profile.name ? null : (
        <div className="right">
          {showIcon(page)?.map(
            (icon, index) =>
              icon && (
                <div key={index} className="icon-container">
                  {icon}
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default SectionHeaderTweet;
