import React from "react";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import AddNewPost from "@/components/homePrivate/AddNewPost";
import CardTweet from "@/components/homePrivate/CardTweet";
import PopupDeletePost from "@/components/homePrivate/PopupDeletePost";
import Aside from "@/components/aside/Aside";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import getAllPostAction from "@/actions/post/getAllPost.action";
import getAllUsersAction from "@/actions/user/getAllUsers.action";
import { privateRoutes } from "@/routes/private.routes";
import { IRootState, IPropsRootStateType } from "@/models";
import AddNewPost1 from "@/components/homePrivate/AddNewPost1";
import PopupDeletePost1 from "@/components/homePrivate/PopupDeletePost1";

interface propsTypes extends IPropsRootStateType {
  getAllPostAction?: any;
  getAllUsersAction?: any;
}

const styleSpinnersLoding: React.CSSProperties = {
  top: "20%",
};

const HomePrivate: React.FC<propsTypes> = ({
  currentUser,
  users,
  posts,
  getAllUsersAction,
  getAllPostAction,
}) => {
  const [loading, setLoading] = React.useState(true);
  const flag = React.useRef(false);

  React.useEffect(() => {
    document.title = privateRoutes.home.title;
    if (!flag.current) {
      getAllUsersAction();
      getAllPostAction();
      flag.current = true;
    }

    if (currentUser && users && posts) setLoading(false);
  }, [flag, currentUser, users, posts, getAllUsersAction, getAllPostAction]);

  return (
    <>
      <main className="main">
        <div className="HomePrivate main-container">
          <section className="sec-header sticky-2">
            <SectionHeaderTweet page={privateRoutes.home.name} title="Latest Tweets" />
          </section>
          <section className="sec-add-new-post">
            <AddNewPost1 nameClass="textarea-1" />
          </section>
          <div className="line"></div>
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
        </div>
      </main>
      <Aside page={privateRoutes.home.name} />
      <PopupDeletePost1 />
    </>
  );
};

const HomePrivateConnectWithStore: React.FC<propsTypes> = ({
  currentUser,
  users,
  posts,
  getAllUsersAction,
  getAllPostAction,
}) => {
  // const currentUser = useSelector((state: IRootState) => state.authReducer.currentUser, shallowEqual);
  // const users = useSelector((state: IRootState) => state.userReducer, shallowEqual);
  // const posts = useSelector((state: IRootState) => state.postReducer, shallowEqual );

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

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
  users: state.userReducer,
  posts: state.postReducer,
});

// export default HomePrivateConnectWithStore;
export default connect(mapStateToProps, { getAllUsersAction, getAllPostAction })(HomePrivateConnectWithStore);
