import React from "react";

import IconSVG from "@/components/widgets/IconSVG";
import { tweetRoutes } from "@/routes/tweet.routes";
import { Link } from "react-router-dom";
import InputSearch from "@/components/widgets/InputSearch";

type Props = { page: string; title: string; subtitle?: string };

const SectionHeaderTweet: React.FC<Props> = ({ page, title, subtitle }) => {
  const showIcon = (page: string): JSX.Element[] | undefined => {
    if (page === tweetRoutes.home.name) return [<IconSVG iconName="etoil" />];
    else if (page === tweetRoutes.explore.name) return [<IconSVG iconName="settings" />];
    else if (page === tweetRoutes.notifications.name) return [<IconSVG iconName="settings" />];
    else if (page === tweetRoutes.bookmarks.name) return [<IconSVG iconName="3-dot" />];
    else if (page === tweetRoutes.messages.name)
      return [<IconSVG iconName="settings" />, <IconSVG iconName="msg" />];
    else if (page === tweetRoutes.lists.name)
      return [<IconSVG iconName="lists-plus" />, <IconSVG iconName="3-dot" />];
  };

  return (
    <div className="SectionHeaderTweet">
      {(page === tweetRoutes.lists.name || page === tweetRoutes.profile.name) && (
        <div className="left">
          <Link to={tweetRoutes.home.path}>
            <IconSVG iconName="back" />
          </Link>
        </div>
      )}
      <div className="center">
        {page === tweetRoutes.explore.name ? (
          <InputSearch />
        ) : (
          <div className={page === tweetRoutes.explore.name ? "centent notif" : "centent"}>
            <strong>{title}</strong>
            {(page === tweetRoutes.profile.name || page === tweetRoutes.bookmarks.name) && (
              <span>{subtitle}</span>
            )}
          </div>
        )}
      </div>
      <div className="right">
        {showIcon(page)?.map((icon) => (
          icon && <div className="icon-container">{icon}</div>
        ))}
      </div>
    </div>
  );
};

export default SectionHeaderTweet;
