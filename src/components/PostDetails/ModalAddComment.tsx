import React from "react";

import Popup from "@/widgets/Popup";
import AddNewComment from "@/components/PostDetails/AddNewComment";
import { useComment } from "@/context/CommentProvider";

const ModalAddComment: React.FC = () => {
  const propsContext = useComment();

  const handleCloseModal = () => {
    propsContext?.handleCloseModal && propsContext.handleCloseModal();
  };

  const handleClosePopup = () => {
    propsContext?.popup.setPopupActive && propsContext.popup.setPopupActive();
  };

  const handleDiscard = () => {
    propsContext && propsContext.handleDiscard();
  };

  return (
    <>
      <div className="modal-global" style={{ display: propsContext?.modal.modalActive ? "flex" : "none" }}>
        <div className="closed" onClick={handleCloseModal}></div>
        <Popup
          popupActive={propsContext?.popup.popupActive ? propsContext?.popup.popupActive : false}
          popupTitle="Discard changes?"
          popupDetail="This can’t be undone and you’ll lose your changes."
          popupBtnText="Discard"
          handleDiscard={handleDiscard}
          handleClose={handleClosePopup}
        />
        <div
          className="modal-container addTweet"
          style={{ height: propsContext?.emojiState.chosenEmoji ? "600px" : "" }}
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
