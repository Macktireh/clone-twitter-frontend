import React from "react";

import ButtonCustom from "../../widgets/ButtonCustom";
import { useEditProfile } from "@/context/EditProfileProvider";
import { IUserProfile, IEditUserData, pictureType } from "@/models";
import Popup from "../../widgets/Popup";

type propsTypes = React.PropsWithChildren<{
  modalActive: boolean;
  titleModal?: string;
  textBtnModal?: string;
  handleCloseMmdal?: () => void;
  currentUser?: IUserProfile | null;
}>;

const ModalEditProfile: React.FC<propsTypes> = ({
  children,
  modalActive,
  titleModal,
  textBtnModal,
  handleCloseMmdal,
  currentUser,
}) => {
  const propsContext = useEditProfile();

  const { first_name, last_name, pseudo, bio } = propsContext?.userData as IEditUserData;
  const { profilePicture, coverPicture } = propsContext?.picture as pictureType;

  const handleClosePopup = () => {
    if (propsContext?.popup?.setPopupActive) propsContext.popup.setPopupActive();
  };

  const handleCloseModal = () => {
    if (currentUser && propsContext?.userData) {
      if (
        currentUser.user.first_name !== first_name ||
        currentUser.user.last_name !== last_name ||
        currentUser.pseudo !== pseudo ||
        currentUser.bio !== bio ||
        profilePicture !== null ||
        coverPicture !== null
      ) {
        handleClosePopup();
      } else {
        if (handleCloseMmdal) handleCloseMmdal();
      }
    } else {
      if (handleCloseMmdal) handleCloseMmdal();
    }
  };

  const handleDiscard = (closePopup: boolean = true) => {
    propsContext?.handleReSetUserData && propsContext.handleReSetUserData();
    handleClosePopup();
    if (handleCloseMmdal) handleCloseMmdal();
  };

  const handleSubmit = async (e: any) => {
    if (propsContext?.handleSubmit) await propsContext.handleSubmit(e);
    if (handleCloseMmdal) {
      await handleCloseMmdal();
    }
    propsContext?.handleReSetUserData && propsContext.handleReSetUserData();
  };

  return (
    <div className="modal-global" style={{ display: modalActive ? "flex" : "none" }}>
      <div className="closed" onClick={() => handleCloseMmdal && handleCloseMmdal()}></div>
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
            <ButtonCustom
              text={textBtnModal}
              handleClick={handleSubmit}
              isDisabled={
                currentUser?.user.first_name !== first_name ||
                currentUser?.user.last_name !== last_name ||
                currentUser?.pseudo !== pseudo ||
                currentUser?.bio !== bio ||
                profilePicture !== null ||
                coverPicture !== null
                  ? false
                  : true
              }
            />
          </div>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default ModalEditProfile;
