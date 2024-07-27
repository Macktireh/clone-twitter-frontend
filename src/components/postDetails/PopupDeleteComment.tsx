import React from "react";

import Popup from "@/widgets/Popup";
import { useTweetComment } from "@/context/TweetCommentProvider";

const PopupDeleteComment = () => {
  const propsContext = useTweetComment();

  const handleClosePopup = () => {
    propsContext?.popupDeleteComment.setPopupActiveDeleteComment &&
      propsContext.popupDeleteComment.setPopupActiveDeleteComment();
  };

  const handleDelete = () => {
    propsContext && propsContext.handleDeleteComment();
  };

  return (
    <Popup
      popupActive={
        propsContext?.popupDeleteComment.popupActiveDeleteComment
          ? propsContext.popupDeleteComment.popupActiveDeleteComment
          : false
      }
      popupTitle="Are you sure you want to delete?"
      popupBtnText="Yes Delete"
      handleDiscard={handleDelete}
      handleClose={handleClosePopup}
    />
  );
};

export default PopupDeleteComment;
