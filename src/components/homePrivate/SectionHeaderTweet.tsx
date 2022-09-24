import React from "react";

import IconSVG from "@/widgets/IconSVG";
import { privateRoutes } from "@/routes/private.routes";
import { Link } from "react-router-dom";
import InputSearch from "@/widgets/InputSearch";

type Props = { page: string; title: string; subtitle?: string };

const SectionHeaderTweet: React.FC<Props> = ({ page, title, subtitle }) => {
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
      {(page === privateRoutes.lists.name || page === privateRoutes.profile.name) && (
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
      <div className="right">
        {showIcon(page)?.map((icon, index) => icon && <div key={index} className="icon-container">{icon}</div>)}
      </div>
    </div>
  );
};

export default SectionHeaderTweet;
