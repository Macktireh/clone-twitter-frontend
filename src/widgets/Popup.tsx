import React from "react";

import ButtonCustom from "@/widgets/ButtonCustom";
import WrapperPopup from "@/widgets/WrapperPopup";

type propsTypes = React.PropsWithChildren<{
  popupActive: boolean | null;
  popupTitle?: string;
  popupDetail?: string;
  popupBtnText?: string;
  hiddenBtnCancel?: boolean;
  nameClassBtn?: string;
  handleDiscard: () => void | null;
  handleClose: () => void | null;
}>;

const Popup: React.FC<propsTypes> = ({
  children,
  popupActive,
  popupTitle,
  popupDetail,
  popupBtnText,
  hiddenBtnCancel,
  nameClassBtn,
  handleDiscard,
  handleClose,
}) => {
  return (
    <WrapperPopup popupActive={popupActive} handleClose={handleClose}>
      <div className="popup-container">
        <div className="tille-popup">
          {children}
          <h2>{popupTitle}</h2>
        </div>
        <p>{popupDetail}</p>
        <div className="box-btn">
          <ButtonCustom
            text={popupBtnText}
            nameClass={nameClassBtn ? nameClassBtn : "btn-danger"}
            onClick={handleDiscard}
          />
          {hiddenBtnCancel ? null : (
            <ButtonCustom text="Annuler" nameClass="btn-cancel" onClick={handleClose} />
          )}
        </div>
      </div>
    </WrapperPopup>
  );
};

export default Popup;
