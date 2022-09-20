import React from "react";

import InputSearch from "@/widgets/InputSearch";
import Trending from "./Trending";
import Follow from "./Follow";
import FooterPrivate from "./FooterPrivate";
import { privateRoutes } from "@/routes/private.routes";

type Props = { page: string };

const Aside: React.FC<Props> = ({ page }) => {
  const renderTrendOrFollowing = (render: string): JSX.Element | undefined => {
    if (render === "Follow") {
      return (
        <div className="follow-container">
          <div className="content">
            <h3>Who to follow</h3>
            {[1, 2, 3].map((n, i) => (
              <Follow key={i} />
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
            {[1, 2, 3, 4, 5, 6].map((n, i) => (
              <Trending key={i} />
            ))}
          </div>
        </div>
      );
    }
  };

  const render = (id: number) => {
    if (id === 1) {
      if (page === privateRoutes.profile.name) return renderTrendOrFollowing("Follow");
      else if (
        page === privateRoutes.home.name ||
        page === privateRoutes.notifications.name ||
        page === privateRoutes.lists.name ||
        page === privateRoutes.bookmarks.name
      )
        return renderTrendOrFollowing("Trends");
    } else if (id === 2) {
      if (page === privateRoutes.profile.name) return renderTrendOrFollowing("Trends");
      else if (
        page === privateRoutes.home.name ||
        page === privateRoutes.notifications.name ||
        page === privateRoutes.lists.name ||
        page === privateRoutes.bookmarks.name
      )
        return renderTrendOrFollowing("Follow");
    }
  };

  return (
    <aside className="aside">
      {page !== privateRoutes.explore.name ? (
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
