import React from "react";
import { connect } from "react-redux";

import InputSearch from "@/widgets/InputSearch";
import Trending from "@/components/aside/Trending";
import CardFollow from "@/components/follow/CardFollow";
import FooterPrivate from "@/components/aside/FooterPrivate";
import { privateRoutes } from "@/routes/private.routes";
import { IPropsRootStateType, IRootState } from "@/models";

interface propsTypes
  extends Omit<
    IPropsRootStateType,
    "users" | "posts" | "postsLikes" | "comments" | "followers" | "following"
  > {
  page: string;
}

const Aside: React.FC<propsTypes> = ({ page, currentUser, peopleConnect }) => {
  const renderTrendOrFollowing = (render: string): JSX.Element | undefined => {
    if (render === "CardFollow") {
      return (
        <div className="follow-container">
          <div className="content">
            <h3>Who to follow</h3>
            {peopleConnect &&
              peopleConnect
                .slice(0, 3)
                .map((u, i) => <CardFollow key={i} bio={false} typeFollow={1} userFollower={u} />)}
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
      if (page === privateRoutes.profile.name) return renderTrendOrFollowing("CardFollow");
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
        return renderTrendOrFollowing("CardFollow");
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
          {renderTrendOrFollowing("CardFollow")}
          <FooterPrivate />
        </div>
      )}
    </aside>
  );
};

const AsideConnectWithStore: React.FC<propsTypes> = ({ page, currentUser, peopleConnect }) => (
  <Aside page={page} currentUser={currentUser} peopleConnect={peopleConnect} />
);

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
  users: state.userReducer,
  peopleConnect: state.followReducer.peopleConnect,
});

export default connect(mapStateToProps, {})(AsideConnectWithStore);
