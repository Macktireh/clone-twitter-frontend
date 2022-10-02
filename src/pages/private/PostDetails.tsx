import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import CardTweetDetails from "@/components/PostDetails/CardTweetDetails";
import CardComment from "@/components/PostDetails/CardComment";
import PopupDeletePost from "@/components/homePrivate/PopupDeletePost";
import PopupDeleteComment from "@/components/PostDetails/PopupDeleteComment";
import Aside from "@/components/aside/Aside";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import getAllUsersAction from "@/actions/user/getAllUsers.action";
import getOnePostAction from "@/actions/post/getOnePost.action";
import getAllPostAction from "@/actions/post/getAllPost.action";
import { IPost, IPropsRootStateType, IRootState, IUserProfile } from "@/models";
import { privateRoutes } from "@/routes/private.routes";
import { useComment } from "@/context/CommentProvider";

interface propsTypes extends IPropsRootStateType {
  getAllUsersAction: () => void;
  // getOnePostAction: (publicId: string) => void;
  getAllPostAction: () => void;
}

const styleSpinnersLoding: React.CSSProperties = {
  top: "80%",
};

const PostDetails: React.FC<propsTypes> = ({
  currentUser,
  users,
  posts,
  // getOnePostAction,
  getAllUsersAction,
  getAllPostAction,
}) => {
  const propsContext = useComment();
  const postPublicIdState = propsContext?.postPublicIdState as {
    postPublicId: string;
    setPostPublicId: (value: string) => void;
  };

  const [loading, setLoading] = React.useState<boolean>(true);
  const [postDetails, setPostDetails] = React.useState<IPost | null>();
  const [authorPost, setAuthorPost] = React.useState<IUserProfile | null>();
  const flag = React.useRef(false);
  const { pseudo, postPublicId } = useParams();

  React.useEffect(() => {
    if (!flag.current && postPublicId) {
      // getOnePostAction(postPublicId);
      getAllUsersAction();
      getAllPostAction();
      flag.current = true;
    }
    if (currentUser && users && posts) {
      if (currentUser.pseudo === pseudo) {
        setTimeout(() => setAuthorPost(currentUser), 100);
      } else {
        setTimeout(() => setAuthorPost(users.find((u) => u.pseudo === pseudo)), 100);
      }
      setTimeout(() => setPostDetails(posts.find((u) => u.publicId === postPublicId)), 100);
    }

    document.title = `${pseudo} on Twitter : ${postDetails?.body.slice(0, 50)}...`;

    if (currentUser && users && postDetails && authorPost) setLoading(false);

    if (postDetails) postPublicIdState.setPostPublicId(postDetails.publicId);
  }, [
    flag,
    currentUser,
    users,
    posts,
    postDetails,
    authorPost,
    pseudo,
    postPublicId,
    postPublicIdState,
    getAllUsersAction,
    getAllPostAction,
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
                    <CardComment currentUser={currentUser} comment={comment} users={users} />
                  </div>
                ))
            )}
          </section>
        </div>
      </main>
      <Aside page={privateRoutes.home.name} />
      <PopupDeletePost />
      <PopupDeleteComment />
    </>
  );
};

const PostDetailsConnectWithStore: React.FC<propsTypes> = ({
  currentUser,
  users,
  posts,
  // getOnePostAction,
  getAllUsersAction,
  getAllPostAction,
}) => {
  return (
    <Layout>
      <PostDetails
        currentUser={currentUser}
        users={users}
        posts={posts}
        // getOnePostAction={getOnePostAction}
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

export default connect(mapStateToProps, { getOnePostAction, getAllPostAction, getAllUsersAction })(
  PostDetailsConnectWithStore
);
