import React from "react";

import Popup from "@/widgets/Popup";
// import { useTweet } from "@/context/TweetProvider";
import { useTweetComment } from "@/context/TweetCommentProvider";

const PopupDeletePost = () => {
  const propsContext = useTweetComment();

  const handleClosePopup = () => {
    propsContext?.popupDeletePost.setPopupActiveDeletePost && propsContext.popupDeletePost.setPopupActiveDeletePost();
  };

  const handleDelete = () => {
    propsContext && propsContext.handleDeletePost();
  };

  return (
      <Popup
        popupActive={
          propsContext?.popupDeletePost.popupActiveDeletePost ? propsContext.popupDeletePost.popupActiveDeletePost : false
        }
        popupTitle="Vous êtes sûr de vouloir supprimer ?"
        popupBtnText="Oui Supprimer"
        handleDiscard={handleDelete}
        handleClose={handleClosePopup}
      />
  );
};

export default PopupDeletePost;
