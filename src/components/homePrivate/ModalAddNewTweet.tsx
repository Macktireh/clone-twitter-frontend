import React from "react";

import Popup from "@/widgets/Popup";
import AddNewPost from "@/components/homePrivate/AddNewPost";
import { useTweet } from "@/context/TweetProvider";

const ModalAddNewTweet: React.FC = () => {
  const propsContext = useTweet();

  const handleCloseModal = () => {
    propsContext?.handleCloseModal && propsContext.handleCloseModal();
  };

  const handleClosePopup = () => {
    propsContext?.popup.setPopupActive && propsContext.popup.setPopupActive();
  };

  const handleDiscard = () => {
    propsContext && propsContext.handleDiscard();
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
            <AddNewPost nameClass="textarea-2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAddNewTweet;
