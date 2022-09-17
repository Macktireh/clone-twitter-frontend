import React from "react";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/tweets/SectionHeaderTweet";
import AddNewPost from "@/components/tweets/AddNewPost";
import CardTweet from "@/components/tweets/CardTweet";
import Aside from "@/components/tweets/Aside";
import { tweetRoutes } from "@/routes/tweet.routes";
import { IStateReduce, PropsStateType } from "@/models";
import getAllPostAction from "@/actions/post/getAllPost.action";
import getAllUsersAction from "@/actions/user/getAllUsers.action";

interface PropsType extends PropsStateType {
  getAllPostAction?: any;
  getAllUsersAction?: any;
}

const News: React.FC<PropsType> = ({ currentUser, posts, getAllUsersAction, getAllPostAction }) => {
  const flag = React.useRef(false);
  React.useEffect(() => {
    document.title = tweetRoutes.home.title;

    if (!flag.current) {
      getAllUsersAction()
      getAllPostAction();
      flag.current = true;
    }

    window.addEventListener("scroll", () => {
      const secHeaderBg: HTMLElement | null = document.querySelector(".sec-header");
      secHeaderBg?.classList.toggle("sticky-2", window.scrollY > 0);
    });
  }, [flag, getAllPostAction, getAllUsersAction]);

  return (
    <>
      <main className="main">
        <div className="News main-container">
          <section className="sec-header">
            <SectionHeaderTweet page={tweetRoutes.home.name} title="Latest Tweets" />
          </section>
          <section className="sec-add-new-post">
            <AddNewPost currentUser={currentUser} />
          </section>
          <div className="line"></div>
          <section className="sec-list-post">
            {posts?.map((post) => (
              <div className="list-post" key={post.publicId}>
                <CardTweet currentUser={currentUser} post={post} />
              </div>
            ))}
          </section>
        </div>
      </main>
      <Aside page={tweetRoutes.home.name} />
    </>
  );
};

const NewsConnectWithStore: React.FC<PropsType> = ({ currentUser, users, posts, getAllUsersAction, getAllPostAction }) => {
  return (
    <Layout>
      <News currentUser={currentUser} users={users} posts={posts} getAllUsersAction={getAllUsersAction} getAllPostAction={getAllPostAction} />
    </Layout>
  );
};

const mapStateToProps = (state: IStateReduce) => ({
  currentUser: state.authReducer.currentUser,
  users: state.userReducer.users,
  posts: state.postReducer.tweets,
});

export default connect(mapStateToProps, { getAllUsersAction, getAllPostAction })(NewsConnectWithStore);
