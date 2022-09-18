import React from "react";

import ButtonCustom from "./ButtonCustom";
import { useEditProfile } from "@/context/EditProfileProvider";
import { IAuthUserProfile } from "@/models";

type PropsType = React.PropsWithChildren<{
  modalActive: boolean;
  titleModal?: string;
  textBtnModal?: string;
  handleClick?: () => void;
  currentUser?: IAuthUserProfile | null;
}>;

const Modal: React.FC<PropsType> = ({ children, modalActive, titleModal, textBtnModal, handleClick }) => {
  const propsContext = useEditProfile();

  const handleSubmit = async (e: any) => {
    if (propsContext?.handleSubmit) propsContext.handleSubmit(e);
    handleClick && handleClick();
  };

  // const handleCancel = () => {
  //   if (propsContext?.userData.first_name )
  //   handleClick && handleClick()
  // }

  return (
    <div className="modal-global" style={{ display: modalActive ? "flex" : "none" }}>
      <div className="closed" onClick={() => handleClick && handleClick()}></div>
      <div className="modal-container">
        <div className="modal-header">
          <div className="icon-and-title">
            <div className="icon-closed">
              <div className="img" onClick={() => handleClick && handleClick()}>
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
