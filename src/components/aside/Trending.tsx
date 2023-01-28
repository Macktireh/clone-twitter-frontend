import React from "react";

import IconSVG from "@/widgets/IconSVG";
import { dataTrendsType } from "@/components/aside/data-trend";


const Trending: React.FC<dataTrendsType> = ({ subject, title, numTweet }) => {
  return (
    <div className="Trending">
      <div className="left">
        <div className="topic">
          <span>{subject}</span>
        </div>
        <div className="name-account">
          <strong>{title}</strong>
        </div>
        <div className="stats-tweet">
          <span>{numTweet}</span>
        </div>
      </div>
      <div className="right">
        <div className="option">
          <IconSVG iconName="3-dot" fill="#919090" />
        </div>
      </div>
    </div>
  );
};

export default Trending;
