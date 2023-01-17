import React from "react";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import FavoriteSection from "@/components/lists/FavoriteSection";
import Aside from "@/components/aside/Aside";
import ButtonAddTweet from "@/components/navbar/ButtonAddTweet";
import { privateRoutes } from "@/routes/private.routes";
import { IRootState, IPropsRootStateType } from "@/models";
import ListSection from "@/components/lists/ListSection";

interface propsTypes
  extends Omit<
    IPropsRootStateType,
    "users" | "posts" | "postsLikes" | "comments" | "followers" | "following" | "peopleConnect"
  > {}

const Lists: React.FC<propsTypes> = ({ currentUser }) => {
  React.useEffect(() => {
    document.title = privateRoutes.lists.title;
  }, []);

  return (
    <>
      <main className="main">
        <div className="lists-page main-container">
          <section className="sec-header sticky-2">
            <SectionHeaderTweet page={privateRoutes.lists.name} title="Lists" subtitle={"@" + currentUser?.pseudo} />
          </section>
          <FavoriteSection />
          <ListSection />
        </div>
        <Aside page={privateRoutes.lists.name} />
      </main>
      <ButtonAddTweet nameClass="add-tweet-global" />
    </>
  );
};

const ListsConnectWithStore: React.FC<propsTypes> = ({ currentUser }) => {
  return (
    <Layout>
      <Lists currentUser={currentUser} />
    </Layout>
  );
};

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
});

export default connect(mapStateToProps, {})(ListsConnectWithStore);
