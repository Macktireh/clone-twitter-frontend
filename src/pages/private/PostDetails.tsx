import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "@/layout/Layout";
import SectionHeaderTweet from "@/components/homePrivate/SectionHeaderTweet";
import CardTweetDetails from "@/components/postDetails/CardTweetDetails";
import CardComment from "@/components/postDetails/CardComment";
import PopupDeletePost from "@/components/homePrivate/PopupDeletePost";
import PopupDeleteComment from "@/components/postDetails/PopupDeleteComment";
import Aside from "@/components/aside/Aside";
import SpinnersLoding from "@/widgets/SpinnersLoding";
import getAllUsersAction from "@/actions/user/getAllUsers.action";
import getAllPostAction from "@/actions/post/getAllPost.action";
import getAllCommentAction from "@/actions/comment/getAllComment.action";
import { IComment, IPost, IPropsRootStateType, IRootState, IUserProfile } from "@/models";
import { privateRoutes } from "@/routes/private.routes";
import { useTweetComment } from "@/context/TweetCommentProvider";

interface propsTypes extends IPropsRootStateType {
  comments: IComment[] | null;
  getAllUsersAction: () => void;
  getAllPostAction: () => void;
  getAllCommentAction: (postPublicId: string) => void;
}

const styleSpinnersLoding: React.CSSProperties = {
  top: "80%",
};

const PostDetails: React.FC<propsTypes> = ({
  currentUser,
  users,
  posts,
  comments,
  getAllUsersAction,
  getAllPostAction,
  getAllCommentAction,
}) => {
  const propsContext = useTweetComment();
  const postPublicIdState = propsContext?.postPublicIdState as {
    postPublicId: string;
    setPostPublicId: (value: string) => void;
  };

  const [loading, setLoading] = React.useState<boolean>(true);
  const [IsPostExist, setIsPostExist] = React.useState<boolean>();
  const [postDetails, setPostDetails] = React.useState<IPost | null>();
  const [authorPost, setAuthorPost] = React.useState<IUserProfile | null>();
  const flag = React.useRef(false);
  const { pseudo, postPublicId } = useParams();

  React.useEffect(() => {
    if (!flag.current && postPublicId) {
      getAllUsersAction();
      getAllPostAction();
      getAllCommentAction(postPublicId);
      flag.current = true;
    }
    if (currentUser && users && posts) {
      if (currentUser.pseudo === pseudo) {
        setAuthorPost(currentUser);
        // setTimeout(() => setAuthorPost(currentUser), 100);
      } else {
        setAuthorPost(users.find((u) => u.pseudo === pseudo));
        // setTimeout(() => setAuthorPost(users.find((u) => u.pseudo === pseudo)), 100);
      }
      const searchPost = posts.filter((p) => p.publicId === postPublicId);
      if (searchPost.length === 0) {
        setIsPostExist(false);
      } else {
        setIsPostExist(true);
        setPostDetails(searchPost[0]);
      }
      // setTimeout(() => setPostDetails(posts.find((u) => u.publicId === postPublicId)), 100);
    }
    document.title =
      postDetails && postDetails.body !== null
        ? `${pseudo} on Twitter : ${postDetails.body.slice(0, 50)}...`
        : (pseudo as string);

    if (currentUser && users && postDetails && authorPost && comments) setLoading(false);

    if (postPublicId) postPublicIdState.setPostPublicId(postPublicId);
  }, [
    flag,
    currentUser,
    users,
    posts,
    comments,
    postDetails,
    authorPost,
    pseudo,
    postPublicId,
    postPublicIdState,
    getAllUsersAction,
    getAllPostAction,
    getAllCommentAction,
  ]);

  if (IsPostExist === false) return <Navigate to="/error/404" />;

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
              comments
                ?.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
                .map((comment) => (
                  <div className="list-post" key={comment.publicId}>
                    <CardComment currentUser={currentUser} comment={comment} users={users} />
                  </div>
                ))
            )}
          </section>
        </div>
        <Aside page={privateRoutes.home.name} />
      </main>
      <PopupDeletePost />
      <PopupDeleteComment />
    </>
  );
};

const PostDetailsConnectWithStore: React.FC<propsTypes> = ({
  currentUser,
  users,
  posts,
  comments,
  getAllUsersAction,
  getAllPostAction,
  getAllCommentAction,
}) => {
  return (
    <Layout>
      <PostDetails
        currentUser={currentUser}
        users={users}
        posts={posts}
        comments={comments}
        getAllUsersAction={getAllUsersAction}
        getAllPostAction={getAllPostAction}
        getAllCommentAction={getAllCommentAction}
      />
    </Layout>
  );
};

const mapStateToProps = (state: IRootState) => ({
  currentUser: state.authReducer.currentUser,
  users: state.userReducer,
  posts: state.postReducer,
  comments: state.commentReducer,
});

export default connect(mapStateToProps, { getAllPostAction, getAllUsersAction, getAllCommentAction })(
  PostDetailsConnectWithStore
);
