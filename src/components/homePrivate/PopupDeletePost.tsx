import React from "react";

import Popup from "@/widgets/Popup";
import { useTweet } from "@/context/TweetProvider";

const PopupDeletePost = () => {
  const propsContext = useTweet();

  const handleClosePopup = () => {
    propsContext?.popupDelete.setPopupActiveDelete && propsContext.popupDelete.setPopupActiveDelete();
  };

  const handleDelete = () => {
    propsContext && propsContext.handleDeletePost();
  };

  return (
      <Popup
        popupActive={
          propsContext?.popupDelete.popupActiveDelete ? propsContext.popupDelete.popupActiveDelete : false
        }
        popupTitle="Vous êtes sûr de vouloir supprimer ?"
        popupBtnText="Oui Supprimer"
        handleDiscard={handleDelete}
        handleClose={handleClosePopup}
      />
  );
};

export default PopupDeletePost;
