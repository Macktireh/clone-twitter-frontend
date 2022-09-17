import React from "react";

import IconSVG from "@/components/widgets/IconSVG";
import { baseURL } from "@/config/axios";

const CardNotif: React.FC = () => {
  return (
    <div className="CardNotif">
      <div className="icon">
        <IconSVG iconName="icon-notif" fill="#794BC4" />
      </div>
      <div className="content">
        <div className="box-img">
          <img src={baseURL + "/mediafiles/default/profilePic.png"} alt="" />
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
