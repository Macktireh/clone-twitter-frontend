import React from "react";

import IconSVG from "@/widgets/IconSVG";
import { useTweet } from "@/context/TweetProvider";

const ButtonAddTweet: React.FC = () => {
  const propsContext = useTweet();

  const toggleModal = () => {
    propsContext?.modal && propsContext.modal.setModalActive();
  };

  return (
    <div className="add-tweet" onClick={toggleModal}>
      <IconSVG iconName="add-tweet" />
      <span>Tweet</span>
    </div>
  );
};

export default ButtonAddTweet;
