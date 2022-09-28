import React from "react";

import { IUserProfile } from "@/models";
import ButtonCustom from "@/widgets/ButtonCustom";
import { baseURL } from "@/config/axios";
import { Link } from "react-router-dom";
import { pathLinkProfile } from "@/utils/pathRoute";
// import { useDispatch } from "react-redux";

type PropsType = React.PropsWithChildren<{
  currentUser?: IUserProfile | null;
  dispatch?: any;
}>;

const TooltipCardUser: React.FC<PropsType> = ({ currentUser, dispatch }) => {
  const handleFollowing = () => {};
  return (
    <div className="TooltipCardUser">
      <div className="content">
        <div className="tooltip-header">
          <Link to={pathLinkProfile(currentUser?.pseudo as string)}>
            <img
              src={baseURL + (currentUser?.profilePicture as string)}
              alt={`profile of ${currentUser?.pseudo}`}
            />
          </Link>
          <ButtonCustom text="Following" handleClick={handleFollowing} />
        </div>
        <div className="username">
          <Link to={pathLinkProfile(currentUser?.pseudo as string)}>
            <strong>
              {currentUser?.user.first_name} {currentUser?.user.last_name}
            </strong>
          </Link>
          <Link to={pathLinkProfile(currentUser?.pseudo as string)}>
            <span>@{currentUser?.pseudo}</span>
          </Link>
        </div>
        <p className="bio">{currentUser?.bio}</p>
        <div className="follow">
          <span>
            <strong>834</strong> Following
          </span>
          <span>
            <strong>451k</strong> Followers
          </span>
        </div>
      </div>
    </div>
  );
};

export default TooltipCardUser;
