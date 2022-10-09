import React from "react";

import IconSVG from "@/widgets/IconSVG";
// import { useTweet } from "@/context/TweetProvider";
import { useTweetComment } from "@/context/TweetCommentProvider";

const ButtonAddTweet: React.FC = () => {
  const propsContext = useTweetComment();

  const toggleModal = () => {
    propsContext?.modalPost && propsContext.modalPost.setModalActivePost();
  };

  return (
    <div className="add-tweet" onClick={toggleModal}>
      <IconSVG iconName="add-tweet" />
      <span>Tweet</span>
    </div>
  );
};

export default ButtonAddTweet;
