import React from 'react';

import Popup from '@/widgets/Popup';
import { useNotificationContext } from '@/context/NotificationProvider';

const ThisIsNnotTwitter: React.FC = () => {
  const propsContext = useNotificationContext()

  const IUnderstandthiswebsiteIsNotTwitter = () => propsContext && propsContext.IUnderstandthiswebsiteIsNotTwitter()

  const setStateIsNotTwitter = () => propsContext && propsContext.setStateIsNotTwitter()

  return (
    <div className="CGU-container" style={{ position: "absolute", width: "100%", height: "100%", display: propsContext?.isNotTwitter ? "none" : "block" }}>
      <Popup
        popupActive={propsContext?.isNotTwitter ? false : true}
        popupTitle="Dit is niet de website van Twitter"
        popupDetail="This application is a clone of Twitter and is not the real Twitter."
        popupBtnText="Okay, I understand."
        handleDiscard={IUnderstandthiswebsiteIsNotTwitter}
        nameClassBtn="btn-ok"
        handleClose={setStateIsNotTwitter}
        hiddenBtnCancel={true}
      />
    </div>
  );
};

export default ThisIsNnotTwitter;