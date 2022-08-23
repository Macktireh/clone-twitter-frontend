import React from "react";

import InputSearch from "@/components/widgets/InputSearch";
import Trending from "./Trending";
import Follow from "./Follow";
import FooterPrivate from "./FooterPrivate";
import { tweetRoutes } from "@/routes/tweet.routes";

type Props = { page: string };

const Aside: React.FC<Props> = ({ page }) => {
  const renderTrendOrFollowing = (render: string): JSX.Element | undefined => {
    if (render === "Follow") {
      return (
        <div className="follow-container">
          <div className="content">
            <h3>Who to follow</h3>
            {[1, 2, 3].map((n) => (
              <Follow />
            ))}
            <span className="show-more">Show more</span>
          </div>
        </div>
      );
    } else if (render === "Trends") {
      return (
        <div className="trends-container">
          <div className="content">
            <h3>Trends for you</h3>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Trending />
            ))}
          </div>
        </div>
      );
    }
  };

  const render = (id: number) => {
    if (id === 1) {
      if (page === tweetRoutes.profile.name) return renderTrendOrFollowing("Follow");
      else if (
        page === tweetRoutes.home.name ||
        page === tweetRoutes.notifications.name ||
        page === tweetRoutes.lists.name ||
        page === tweetRoutes.bookmarks.name
      )
        return renderTrendOrFollowing("Trends");
    } else if (id === 2) {
      if (page === tweetRoutes.profile.name) return renderTrendOrFollowing("Trends");
      else if (
        page === tweetRoutes.home.name ||
        page === tweetRoutes.notifications.name ||
        page === tweetRoutes.lists.name ||
        page === tweetRoutes.bookmarks.name
      )
        return renderTrendOrFollowing("Follow");
    }
  };

  return (
    <aside className="aside">
      {page !== tweetRoutes.explore.name ? (
        <>
          <div className="search-container">
            <InputSearch />
          </div>
          {render(1)}
          <div className="footer-container">
            {render(2)}
            <FooterPrivate />
          </div>
        </>
      ) : (
        <div className="footer-container explore">
          {renderTrendOrFollowing("Follow")}
          <FooterPrivate />
        </div>
      )}
    </aside>
  );
};

export default Aside;
