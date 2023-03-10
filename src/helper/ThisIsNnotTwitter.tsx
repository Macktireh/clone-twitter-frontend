import React from "react";

import Popup from "@/widgets/Popup";
import IconSVG from "@/widgets/IconSVG";
import { useNotificationContext } from "@/context/NotificationProvider";

const ThisIsNnotTwitter: React.FC = () => {
  const propsContext = useNotificationContext();

  const IUnderstandthiswebsiteIsNotTwitter = () =>
    propsContext && propsContext.IUnderstandthiswebsiteIsNotTwitter();

  const setStateIsNotTwitter = () => propsContext && propsContext.setStateIsNotTwitter();

  return (
    <div
      className="CGU-container"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: propsContext?.isNotTwitter ? "none" : "block",
      }}
    >
      <Popup
        popupActive={propsContext?.isNotTwitter ? false : true}
        popupTitle="Important information"
        nameClassH2="h2-tille-popup"
        popupDetail="We inform you that this application is a Twitter clone and not the real Twitter. Thank you for your understanding."
        popupBtnText="Okay, I understand."
        handleDiscard={IUnderstandthiswebsiteIsNotTwitter}
        nameClassBtn="btn-ok"
        handleClose={setStateIsNotTwitter}
        hiddenBtnCancel={true}
      >
        <IconSVG iconName="info" nameClass="ThisIsNnotTwitterIconInfo" />
      </Popup>
    </div>
  );
};

export default ThisIsNnotTwitter;
