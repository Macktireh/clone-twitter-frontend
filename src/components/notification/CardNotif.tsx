import React from "react";

import IconSVG from "@/widgets/IconSVG";
import { IUserProfile } from '../../models/userProfile';

type propsTypes = {
  fromUser: IUserProfile
}

const CardNotif: React.FC<propsTypes> = ({ fromUser }) => {
  return (
    <div className="CardNotif">
      <div className="icon">
        <IconSVG iconName="icon-notif" fill="#794BC4" />
      </div>
      <div className="content">
        <div className="box-img">
          <img src={fromUser.profilePicture as string} alt="" />
          <div className="svg-icon">
            <IconSVG iconName="3-dot" fill="#919090" />
          </div>
        </div>
        <div className="box-name">
          <strong>{`${fromUser.user.first_name} ${fromUser.user.last_name}`}</strong>
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
