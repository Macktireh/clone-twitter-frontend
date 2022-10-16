import React from "react";

import Popup from "@/widgets/Popup";
import AddNewPost from "@/components/homePrivate/AddNewPost";
import { useTweetComment } from "@/context/TweetCommentProvider";

const ModalAddNewTweet: React.FC = () => {
  const propsContext = useTweetComment();

  const handleCloseModal = () => {
    propsContext?.handleCloseModalPost && propsContext.handleCloseModalPost();
  };

  const handleClosePopup = () => {
    propsContext?.popupPost.setPopupActivePost && propsContext.popupPost.setPopupActivePost();
  };

  const handleDiscard = () => {
    propsContext && propsContext.handleDiscardPost();
  };

  // const handleEmoji = () => {
  //   if (propsContext)
  //     propsContext.emojiState.chosenEmoji &&
  //       propsContext.emojiState.setChosenEmoji(!propsContext.emojiState.chosenEmoji);
  // };

  return (
    <>
      {/* <div
        className="close-emoji"
        style={{ display: propsContext?.emojiState.chosenEmoji ? "flex" : "none" }}
        onClick={handleEmoji}
      ></div> */}
      <div
        className="modal-global"
        style={{ display: propsContext?.modalPost.modalActivePost ? "flex" : "none" }}
      >
        <div className="closed" onClick={handleCloseModal}></div>
        <Popup
          popupActive={
            propsContext?.popupPost.popupActivePost ? propsContext?.popupPost.popupActivePost : false
          }
          popupTitle="Discard changes?"
          popupDetail="This can’t be undone and you’ll lose your changes."
          popupBtnText="Discard"
          handleDiscard={handleDiscard}
          handleClose={handleClosePopup}
        />
        <div
          className={propsContext?.emojiPostState.chosenEmojiPost ? "modal-container addTweet addTweetHeight" : "modal-container addTweet"}
          // style={{ height: propsContext?.emojiPostState.chosenEmojiPost ? "600px" : "" }}
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
            <AddNewPost nameClass="textarea-2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAddNewTweet;
