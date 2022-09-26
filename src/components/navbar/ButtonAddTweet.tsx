import React from "react";

import IconSVG from "@/widgets/IconSVG";
import { useAddNewTweet } from '@/context/AddNewTweetProvider';

const ButtonAddTweet: React.FC = () => {

  const propsContext = useAddNewTweet();

  const handleCloseModal = () => {
    propsContext?.modal && propsContext.modal.setModalActive()
  }

  return (
    <div className="add-tweet" onClick={handleCloseModal}>
      <IconSVG iconName="add-tweet" />
      <span>Tweet</span>
    </div>
  );
};

export default ButtonAddTweet;
