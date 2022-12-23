import React from "react";
import { useSelector } from "react-redux";

import Popup from "@/widgets/Popup";
import AddNewComment from "@/components/postDetails/AddNewComment";
import { TweetCommentContextPropsType, useTweetComment } from "@/context/TweetCommentProvider";
import CardTweet from "@/components/homePrivate/CardTweet";
import { IPost, IRootState, IUserProfile } from "@/models";

type propsTypes = {
  propsContext: TweetCommentContextPropsType | null;
  currentUser: IUserProfile | null;
  post: IPost | null;
  users: IUserProfile[] | null;
};

const ModalAddComment: React.FC<propsTypes> = ({ propsContext, currentUser, post, users }) => {
  const handleCloseModal = () => {
    propsContext?.handleCloseModalComment && propsContext.handleCloseModalComment();
  };

  const handleClosePopup = () => {
    propsContext?.popupComment.setPopupActiveComment && propsContext.popupComment.setPopupActiveComment();
  };

  const handleDiscard = () => {
    propsContext && propsContext.handleDiscardComment();
  };

  React.useEffect(() => {
    const tweetPublicId = propsContext?.postPublicIdState.postPublicId;
    if (tweetPublicId) {
    }
  });

  return (
    <div
      className="modal-global"
      style={{ display: propsContext?.modalComment.modalActiveComment ? "flex" : "none" }}
    >
      <div className="closed" onClick={handleCloseModal}></div>
      <Popup
        popupActive={
          propsContext?.popupComment.popupActiveComment
            ? propsContext?.popupComment.popupActiveComment
            : false
        }
        popupTitle="Discard changes?"
        popupDetail="This can’t be undone and you’ll lose your changes."
        popupBtnText="Discard"
        handleDiscard={handleDiscard}
        handleClose={handleClosePopup}
      />
      <div
        className="modal-container addTweet"
        style={{ height: propsContext?.emojiCommentState.chosenEmojiComment ? "600px" : "" }}
      >
        <div className="modal-header">
          <div className="icon-and-title">
            <div className="icon-closed">
              <div className="img" onClick={handleCloseModal}>
                <img src="/static/svg/close.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-content">
          <CardTweet currentUser={currentUser} post={post} users={users} displayImageIcons={true} />
          <div className="replying">
            <div className="line-v"></div>
            <p>
              replying to <span>@{post?.authorDetail.pseudo}</span>
            </p>
          </div>
          <AddNewComment nameClass="textarea-4" />
        </div>
      </div>
    </div>
  );
};

const ModalAddCommentConnectWithStore: React.FC = () => {
  const [tweet, setTweet] = React.useState<IPost>();
  const currentUser = useSelector((state: IRootState) => state.authReducer.currentUser);
  const posts = useSelector((state: IRootState) => state.postReducer);
  const users = useSelector((state: IRootState) => state.userReducer);
  const propsContext = useTweetComment();

  React.useEffect(() => {
    const tweetPublicId = propsContext?.postPublicIdState.postPublicId;
    if (tweetPublicId) {
      const post = posts?.find((post) => post.publicId === tweetPublicId);
      if (post) setTweet(post);
    }
  }, [propsContext, currentUser, posts, tweet, users, tweet]);

  return (
    <ModalAddComment
      propsContext={propsContext}
      currentUser={currentUser}
      post={tweet ? tweet : null}
      users={users}
    />
  );
};

export default ModalAddCommentConnectWithStore;
