import React from "react";

import ButtonCustom from "@/widgets/ButtonCustom";
import { IUserProfile } from "@/models";

type propsTypes = {
  userFollower?: IUserProfile | null;
  bio: boolean;
  typeFollow: number;
};

const CardFollow: React.FC<propsTypes> = ({ bio, typeFollow, userFollower }) => {
  return (
    <div className="CardFollow">
      <div className="left">
        <div className="img-container">
          <img
            src="https://res.cloudinary.com/doysjtoym/image/upload/v1665693389/cloneTwitter/default/profilePic_hbvouc.png"
            alt=""
          />
        </div>
        <div className="info-container">
          <strong>{`${userFollower?.user.first_name} ${userFollower?.user.last_name}`}</strong>
          <span>@{userFollower?.pseudo}</span>
          {bio ? <p>{userFollower?.bio}</p> : null}
        </div>
      </div>
      <div className="right">
        <ButtonCustom text={typeFollow === 1 ? "Follow" : "Unfollow"} />
      </div>
    </div>
  );
};

export default CardFollow;
