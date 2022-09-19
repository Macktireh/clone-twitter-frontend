import React from "react";

import ButtonCustom from "./ButtonCustom";
import { useEditProfile } from "@/context/EditProfileProvider";
import { IAuthUserProfile } from "@/models";
import Popup from "./Popup";

type PropsType = React.PropsWithChildren<{
  modalActive: boolean;
  titleModal?: string;
  textBtnModal?: string;
  handleClick?: () => void;
  currentUser?: IAuthUserProfile | null;
}>;

const Modal: React.FC<PropsType> = ({
  children,
  modalActive,
  titleModal,
  textBtnModal,
  handleClick,
  currentUser,
}) => {
  const propsContext = useEditProfile();

  const handleClosePopup = () => {
    if (propsContext?.popup?.setPopupActive) propsContext.popup.setPopupActive();
  };

  const handleCloseModal = () => {
    if (currentUser && propsContext?.userData) {
      if (
        currentUser.user.first_name !== propsContext.userData.first_name ||
        currentUser.user.last_name !== propsContext.userData.last_name ||
        currentUser.pseudo !== propsContext.userData.pseudo ||
        currentUser.bio !== propsContext.userData.bio ||
        propsContext.picture?.profilePicture !== null ||
        propsContext.picture?.coverPicture !== null
      ) {
        console.log("propsContext.picture?.coverPicture : ", propsContext.picture?.coverPicture)
        console.log(propsContext.picture?.coverPicture !== null)
        console.log("propsContext.picture?.profilePicture : ", propsContext.picture?.profilePicture)
        console.log(propsContext.picture?.profilePicture !== null)
        handleClosePopup();
      } else {
        if (handleClick) handleClick();
      }
    } else {
      if (handleClick) handleClick();
    }
  };

  const handleDiscard = () => {
    const resetUserData = {
      public_id: currentUser?.user.public_id,
      first_name: currentUser?.user.first_name,
      last_name: currentUser?.user.last_name,
      pseudo: currentUser?.pseudo,
      bio: currentUser?.bio,
    };
    const pictures = {
      profilePicture: null,
      coverPicture: null,
    };
    propsContext?.handleReSetUserData && propsContext.handleReSetUserData(resetUserData, pictures);
    handleClosePopup();
    if (handleClick) handleClick();
  };

  const handleSubmit = async (e: any) => {
    if (propsContext?.handleSubmit) propsContext.handleSubmit(e);
    if (handleClick) handleClick();
  };

  return (
    <div className="modal-global" style={{ display: modalActive ? "flex" : "none" }}>
      <div className="closed" onClick={() => handleClick && handleClick()}></div>
      <Popup
        popupActive={propsContext?.popup?.popupActive ? propsContext.popup?.popupActive : null}
        popupTitle="Discard changes?"
        popupDetail="This can’t be undone and you’ll lose your changes."
        popupBtnText="Discard"
        handleDiscard={handleDiscard}
        handleClose={handleClosePopup}
      />
      <div className="modal-container">
        <div className="modal-header">
          <div className="icon-and-title">
            <div className="icon-closed">
              <div className="img" onClick={handleCloseModal}>
                <img src="/static/svg/close.svg" alt="" />
              </div>
            </div>
            <div className="title-modal">
              <h2>{titleModal}</h2>
            </div>
          </div>
          <div className="btn-modal">
            <ButtonCustom text={textBtnModal} handleClick={handleSubmit} />
          </div>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
