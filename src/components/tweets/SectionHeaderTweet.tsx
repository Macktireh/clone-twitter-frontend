import * as React from "react";

import IconSVG from "@/components/widgets/IconSVG";
import { tweetRoutes } from "@/routes/tweet.routes";
import { Link } from "react-router-dom";

type Props = { page: string; title: string; subtitle?: string };

const SectionHeaderTweet: React.FC<Props> = ({ page, title, subtitle }) => {
  const showIcon = (page: string) => {
    if (page === tweetRoutes.home.name) return <IconSVG iconName="etoil" />;
    else if (page === tweetRoutes.explore.name) return <IconSVG iconName="settings" />;
    else if (page === tweetRoutes.notifications.name) return <IconSVG iconName="settings" />;
    else if (page === tweetRoutes.messages.name)
      return (
        <>
          <IconSVG iconName="settings" />
          <IconSVG iconName="msg" />
        </>
      );
    else if (page === tweetRoutes.lists.name)
      return (
        <>
          <IconSVG iconName="lists-plus" />
          <IconSVG iconName="point" />
        </>
      );
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
        <h2>{title}</h2>
        {page === tweetRoutes.profile.name && <span>{subtitle}</span>}
      </div>
      <div className="right">{showIcon(page)}</div>
    </div>
  );
};

export default SectionHeaderTweet;
