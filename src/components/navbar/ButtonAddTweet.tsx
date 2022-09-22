import React from "react";

import IconSVG from "@/widgets/IconSVG";
import { useAddNewTweet } from '@/context/AddNewTweetProvider';

const ButtonAddTweet: React.FC = () => {

  const propsContext = useAddNewTweet();

  return (
    <div className="add-tweet" onClick={propsContext?.popup?.setPopupActive}>
      <IconSVG iconName="add-tweet" />
      <span>Tweet</span>
    </div>
  );
};

export default ButtonAddTweet;
