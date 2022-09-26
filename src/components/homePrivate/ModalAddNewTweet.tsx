import React from "react";

import Popup from "@/widgets/Popup";
import AddNewPost from "@/components/homePrivate/AddNewPost";
import { useTweet } from "@/context/TweetProvider";

const ModalAddNewTweet: React.FC = () => {
  const propsContext = useTweet();

  const handleCloseModal = () => {
    if (propsContext) {
      if (propsContext.bodyState.body || propsContext.imageState.image) {
        propsContext.popup.setPopupActive();
      } else {
        propsContext?.modal && propsContext.modal.setModalActive();
      }
    }
  };

  const handleClosePopup = () => {
    propsContext?.popup.setPopupActive && propsContext.popup.setPopupActive();
  };

  const handleDiscard = () => {
    propsContext && propsContext.handleDiscard();
  };

  return (
    <div className="modal-global" style={{ display: propsContext?.modal.modalActive ? "flex" : "none" }}>
      <div className="closed" onClick={handleCloseModal}></div>
      <Popup
        popupActive={propsContext?.popup.popupActive ? false : false}
        popupTitle="Discard changes?"
        popupDetail="This can’t be undone and you’ll lose your changes."
        popupBtnText="Discard"
        handleDiscard={handleDiscard}
        handleClose={handleClosePopup}
      />
      <div className="modal-container addTweet">
        <div className="modal-header">
          <div className="icon-and-title">
            <div className="icon-closed">
              <div className="img" onClick={handleCloseModal}>
                <img src="/static/svg/close.svg" alt="" />
              </div>
            </div>
            {/* <div className="title-modal">
              <h2>{titleModal}</h2>
            </div> */}
          </div>
          {/* <div className="btn-modal">
            <ButtonCustom text={textBtnModal} handleClick={handleSubmit} />
          </div> */}
        </div>
        <div className="modal-content">
          <AddNewPost nameClass="textarea-2" />
        </div>
      </div>
    </div>
  );
};

export default ModalAddNewTweet;
