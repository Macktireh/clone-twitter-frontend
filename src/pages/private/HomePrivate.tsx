import React from "react";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import AddNewPost from "@/components/homePrivate/AddNewPost";
import CardTweet from "@/components/homePrivate/CardTweet";
import Aside from "@/components/aside/Aside";
import { privateRoutes } from "@/routes/private.routes";
import { IStateReduce, PropsStateType } from "@/models";
import getAllPostAction from "@/actions/post/getAllPost.action";
import getAllUsersAction from "@/actions/user/getAllUsers.action";

interface PropsType extends PropsStateType {
  getAllPostAction?: any;
  getAllUsersAction?: any;
}

const HomePrivate: React.FC<PropsType> = ({ currentUser, users, posts, getAllUsersAction, getAllPostAction }) => {
  const flag = React.useRef(false);
  React.useEffect(() => {
    document.title = privateRoutes.home.title;

    if (!flag.current) {
      getAllUsersAction();
      getAllPostAction();
      flag.current = true;
    }

    // window.addEventListener("scroll", () => {
    //   const secHeaderBg: HTMLElement | null = document.querySelector(".sec-header");
    //   secHeaderBg?.classList.toggle("sticky-2", window.scrollY > 0);
    // });
  }, [flag, getAllPostAction, getAllUsersAction]);

  return (
    <>
      <main className="main">
        <div className="HomePrivate main-container">
          <section className="sec-header sticky-2">
            <SectionHeaderTweet page={privateRoutes.home.name} title="Latest Tweets" />
          </section>
          <section className="sec-add-new-post">
            <AddNewPost currentUser={currentUser} />
          </section>
          <div className="line"></div>
          <section className="sec-list-post">
            {posts?.map((post) => (
              <div className="list-post" key={post.publicId}>
                <CardTweet currentUser={currentUser} post={post} users={users} />
                {/* {users?.filter((user) => user.user.public_id === post.authorDetail.public_id)
                 .map((user) => (
              
                 ))} */}
              </div>
            ))}
          </section>
        </div>
      </main>
      <Aside page={privateRoutes.home.name} />
    </>
  );
};

const HomePrivateConnectWithStore: React.FC<PropsType> = ({
  currentUser,
  users,
  posts,
  getAllUsersAction,
  getAllPostAction,
}) => {
  return (
    <Layout>
      <HomePrivate
        currentUser={currentUser}
        users={users}
        posts={posts}
        getAllUsersAction={getAllUsersAction}
        getAllPostAction={getAllPostAction}
      />
    </Layout>
  );
};

const mapStateToProps = (state: IStateReduce) => ({
  currentUser: state.authReducer.currentUser,
  users: state.userReducer.users,
  posts: state.postReducer.tweets,
});

export default connect(mapStateToProps, { getAllUsersAction, getAllPostAction })(HomePrivateConnectWithStore);
