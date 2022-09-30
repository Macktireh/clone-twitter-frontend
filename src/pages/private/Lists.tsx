import React from "react";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import { privateRoutes } from "@/routes/private.routes";
import { connect } from "react-redux";
import { IUserProfile, IRootState } from "@/models";
import Aside from "@/components/aside/Aside";

type propsTypes = { currentUser: IUserProfile | null };

const Lists: React.FC<propsTypes> = () => {
  return (
    <>
      <main className="main">
        <div className="main-container">
          <section className="sec-header sticky-2">
            <SectionHeaderTweet page={privateRoutes.lists.name} title="Lists" />
          </section>
          <div>Lists</div>
        </div>
      </main>
      <Aside page={privateRoutes.lists.name} />
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
