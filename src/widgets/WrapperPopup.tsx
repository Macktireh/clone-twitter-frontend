import React from "react";

type propsTypes = React.PropsWithChildren<{
  popupActive: boolean | null;
  handleClose: () => void | null;
}>;

const WrapperPopup: React.FC<propsTypes> = ({ children, popupActive, handleClose }) => {
  return (
    <div className="popup" style={{ display: popupActive ? "block" : "none" }}>
      <div className="closed" onClick={() => handleClose && handleClose()}></div>
      {children}
    </div>
  );
};

export default WrapperPopup;
