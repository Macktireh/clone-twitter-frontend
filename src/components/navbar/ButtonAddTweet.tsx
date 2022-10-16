import React from "react";

import IconSVG from "@/widgets/IconSVG";
import { useTweetComment } from "@/context/TweetCommentProvider";

type PropsTypes = { nameClass: string }

const ButtonAddTweet: React.FC<PropsTypes> = ({ nameClass }) => {
  const propsContext = useTweetComment();

  const toggleModal = () => {
    propsContext?.modalPost && propsContext.modalPost.setModalActivePost();
  };

  return (
    <div className={nameClass} onClick={toggleModal}>
      <IconSVG iconName="add-tweet" />
      <span>Tweet</span>
    </div>
  );
};

export default ButtonAddTweet;
