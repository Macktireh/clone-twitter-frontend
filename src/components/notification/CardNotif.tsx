import React from "react";

import IconSVG from "@/widgets/IconSVG";

const CardNotif: React.FC = () => {
  return (
    <div className="CardNotif">
      <div className="icon">
        <IconSVG iconName="icon-notif" fill="#794BC4" />
      </div>
      <div className="content">
        <div className="box-img">
          <img src="https://res.cloudinary.com/doysjtoym/image/upload/v1665693389/cloneTwitter/default/profilePic_hbvouc.png" alt="" />
          <div className="svg-icon">
            <IconSVG iconName="3-dot" fill="#919090" />
          </div>
        </div>
        <div className="box-name">
          <strong>Macktireh Abdi Soubaneh</strong>
        </div>
        <div className="box-msg">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam ipsum officia voluptates nisi
            accusamus neque. Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardNotif;
