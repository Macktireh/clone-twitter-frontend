import React from "react";

import ButtonCustom from "@/widgets/ButtonCustom";

type PropsType = React.PropsWithChildren<{
  popupActive: boolean | null;
  popupTitle?: string;
  popupDetail?: string;
  popupBtnText?: string;
  handleDiscard?: () => void | null;
  handleClose?: () => void | null;
}>;

const Popup: React.FC<PropsType> = ({
  // children,
  popupActive,
  popupTitle,
  popupDetail,
  popupBtnText,
  handleDiscard,
  handleClose,
}) => {
  return (
    <div className="popup"  style={{ display: popupActive ? "block" : "none" }}>
      <div className="closed" onClick={() => handleClose && handleClose()}></div>
      <div className="popup-container">
        <h2>{popupTitle}</h2>
        <p>{popupDetail}</p>
        <ButtonCustom text={popupBtnText} nameClass="btn-danger" handleClick={() => handleDiscard && handleDiscard()} />
        <ButtonCustom text="Annuler" handleClick={() => handleClose && handleClose()} />
      </div>
    </div>
  );
};

export default Popup;
