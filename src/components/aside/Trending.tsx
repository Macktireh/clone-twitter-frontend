import React from "react";

import IconSVG from "@/widgets/IconSVG";

const Trending: React.FC = () => {
  return (
    <div className="Trending">
      <div className="left">
        <div className="topic">
          <span>Sports · Trending</span>
        </div>
        <div className="name-account">
          <strong>Macktireh ABDI SOUBANEH</strong>
        </div>
        <div className="stats-tweet">
          <span>4,245k tweets</span>
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
