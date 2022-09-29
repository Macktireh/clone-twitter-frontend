import React from "react";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import CardTweet from "@/components/homePrivate/CardTweet";
import Aside from "@/components/aside/Aside";
import PopupDeletePost from "@/components/homePrivate/PopupDeletePost";
import { IPropsRootStateType, IRootState } from "@/models";
import { privateRoutes } from "@/routes/private.routes";
import AddNewPost from "@/components/homePrivate/AddNewPost";

interface PropsType extends IPropsRootStateType {}

const styleSpinnersLoding: React.CSSProperties = {
  top: "20%",
};

const PostDetails: React.FC<PropsType> = ({ currentUser, users, posts }) => {
  const [loading, setLoading] = React.useState(true);
  // const flag = React.useRef(false);
  React.useEffect(() => {
    document.title = privateRoutes.home.title;

    if (currentUser && users && posts) setLoading(false);
  }, [currentUser, users, posts]);

  return (
    <>
      <main className="main">
        <div className="HomePrivate main-container">
          <section className="sec-header sticky-2">
            <SectionHeaderTweet page={privateRoutes.postDetails.name} title="Tweet" />
          </section>
          
          {/* <div className="line"></div> */}
          <section className="sec-list-post">
            {loading ? (
              <SpinnersLoding isLoading={loading} styleSpinnersLoding={styleSpinnersLoding} />
            ) : (
              posts
                ?.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
                .map((post) => (
                  <div className="list-post" key={post.publicId}>
                    <CardTweet currentUser={currentUser} post={post} users={users} />
                  </div>
                ))
            )}
          </section>
          <section className="sec-add-new-post">
            <AddNewPost nameClass="textarea-1" />
          </section>
        </div>
      </main>
      <Aside page={privateRoutes.home.name} />
      <PopupDeletePost />
    </>
  );
};

const PostDetailsConnectWithStore: React.FC<PropsType> = ({ currentUser, users, posts }) => {
  return (
    <Layout>
      <PostDetails currentUser={currentUser} users={users} posts={posts} />
    </Layout>
  );
};

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
  users: state.userReducer,
  posts: state.postReducer,
});

export default connect(mapStateToProps, {})(PostDetailsConnectWithStore);
