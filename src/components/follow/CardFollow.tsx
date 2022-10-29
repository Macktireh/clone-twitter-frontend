import React from "react";
import { useNavigate } from "react-router-dom";

import ButtonCustom from "@/widgets/ButtonCustom";
import { IUser } from "@/models";
import { pathLinkProfile } from "@/utils/pathRoute";

type propsTypes = {
  userFollower?: IUser | null;
  bio: boolean;
  typeFollow: number;
};

const CardFollow: React.FC<propsTypes> = ({ bio, typeFollow, userFollower }) => {
  const navigate = useNavigate()
  return (
    <div className="CardFollow">
      <div
        className="click"
        onClick={() => userFollower && navigate(pathLinkProfile(userFollower.pseudo))}
      ></div>
      <div className="left">
        <div className="img-container">
          <img
            src={userFollower?.profilePicture as string}
            alt={`${userFollower?.first_name} ${userFollower?.last_name}`}
          />
        </div>
        <div className="info-container">
          <strong>{`${userFollower?.first_name} ${userFollower?.last_name}`}</strong>
          <span>@{userFollower?.pseudo}</span>
          {bio ? <p>{userFollower?.bio}</p> : null}
        </div>
      </div>
      <div className={typeFollow === 2 ? "right transparent" : "right"}>
        <ButtonCustom text={typeFollow === 1 ? "Follow" : "Unfollow"} />
      </div>
    </div>
  );
};

export default CardFollow;
