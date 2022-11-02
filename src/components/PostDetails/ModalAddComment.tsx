import React from "react";

import Popup from "@/widgets/Popup";
import AddNewComment from "@/components/postDetails/AddNewComment";
// import { useComment } from "@/context/CommentProvider";
import { useTweetComment } from "@/context/TweetCommentProvider";

const ModalAddComment: React.FC = () => {
  const propsContext = useTweetComment();

  const handleCloseModal = () => {
    propsContext?.handleCloseModalComment && propsContext.handleCloseModalComment();
  };

  const handleClosePopup = () => {
    propsContext?.popupComment.setPopupActiveComment && propsContext.popupComment.setPopupActiveComment();
  };

  const handleDiscard = () => {
    propsContext && propsContext.handleDiscardComment();
  };

  return (
    <>
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
            <AddNewComment nameClass="textarea-4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAddComment;
