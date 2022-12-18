import React from "react";

import ButtonCustom from "@/widgets/ButtonCustom";

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
  // children,
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
    <div className="popup" style={{ display: popupActive ? "block" : "none" }}>
      <div className="closed" onClick={() => handleClose && handleClose()}></div>
      <div className="popup-container">
        <h2>{popupTitle}</h2>
        <p>{popupDetail}</p>
        <ButtonCustom text={popupBtnText} nameClass={nameClassBtn ? nameClassBtn : "btn-danger"} onClick={handleDiscard} />
        {hiddenBtnCancel ? null : <ButtonCustom text="Annuler" nameClass="btn-cancel" onClick={handleClose} />}
      </div>
    </div>
  );
};

export default Popup;
