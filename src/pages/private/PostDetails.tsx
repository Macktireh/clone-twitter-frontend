import React from "react";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import Aside from "@/components/aside/Aside";
import PopupDeletePost from "@/components/homePrivate/PopupDeletePost";
import { IPost, IPropsRootStateType, IRootState, IUserProfile } from "@/models";
import { privateRoutes } from "@/routes/private.routes";
import { useParams } from "react-router-dom";
import CardReTweet from "@/components/PostDetails/CardReTweet";
import getAllUsersAction from "@/actions/user/getAllUsers.action";
import getOnePostAction from "@/actions/post/getOnePost.action";
import CardTweetDetails from "@/components/PostDetails/CardTweetDetails";
import getAllPostAction from "@/actions/post/getAllPost.action";

interface propsTypes extends IPropsRootStateType {
  postDetails?: IPost | null;
  getAllUsersAction: () => void;
  getOnePostAction: (publicId: string) => void;
  getAllPostAction: () => void;
}

const styleSpinnersLoding: React.CSSProperties = {
  top: "80%",
};

const PostDetails: React.FC<propsTypes> = ({
  currentUser,
  users,
  posts,
  getOnePostAction,
  getAllUsersAction,
  getAllPostAction
}) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [postDetails, setPostDetails] = React.useState<IPost | null>();
  const [authorPost, setAuthorPost] = React.useState<IUserProfile | null>();
  const flag = React.useRef(false);
  const { pseudo, postPublicId } = useParams();

  React.useEffect(() => {
    if (!flag.current && postPublicId) {
      getOnePostAction(postPublicId);
      getAllUsersAction();
      getAllPostAction()
      // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      flag.current = true;
    }
    if (currentUser && users && posts) {
      if (currentUser.pseudo === pseudo) {
        setTimeout(() => setAuthorPost(currentUser), 15000)
      } else {
        setTimeout(() => setAuthorPost(users.find((u) => u.pseudo === pseudo)), 15000)
      }
      setTimeout(() => setPostDetails(posts.find((u) => u.publicId === postPublicId)), 15000);
    }

    document.title = `${pseudo} on Twitter : ${postDetails?.body.slice(0, 50)}...`;

    if (currentUser && users && postDetails && authorPost) setLoading(false);
  }, [
    flag,
    currentUser,
    users,
    posts,
    postDetails,
    authorPost,
    pseudo,
    postPublicId,
    getOnePostAction,
    getAllUsersAction,
    getAllPostAction
  ]);

  return (
    <>
      <main className="main">
        <div className="HomePrivate main-container">
          <section className="sec-header sticky-2">
            <SectionHeaderTweet page={privateRoutes.postDetails.name} title="Tweet" />
          </section>
          <section className="postDetails">
            <CardTweetDetails
              currentUser={currentUser}
              authorPost={authorPost as IUserProfile}
              postDetails={postDetails as IPost}
            />
          </section>

          <section className="sec-list-post">
            {loading ? (
              <SpinnersLoding isLoading={loading} styleSpinnersLoding={styleSpinnersLoding} />
            ) : (
              postDetails?.comments
                ?.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
                .map((comment) => (
                  <div className="list-post" key={comment.publicId}>
                    <CardReTweet currentUser={currentUser} comment={comment} users={users} />
                  </div>
                ))
            )}
          </section>
        </div>
      </main>
      <Aside page={privateRoutes.home.name} />
      <PopupDeletePost />
    </>
  );
};

const PostDetailsConnectWithStore: React.FC<propsTypes> = ({
  currentUser,
  users,
  posts,
  postDetails,
  getOnePostAction,
  getAllUsersAction,
  getAllPostAction,
}) => {
  return (
    <Layout>
      <PostDetails
        currentUser={currentUser}
        users={users}
        posts={posts}
        postDetails={postDetails}
        getOnePostAction={getOnePostAction}
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
  postDetails: state.postDetailsReducer,
});

export default connect(mapStateToProps, { getOnePostAction, getAllPostAction, getAllUsersAction })(PostDetailsConnectWithStore);
