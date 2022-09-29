import React from "react";

import ButtonCustom from "@/widgets/ButtonCustom";
import { IPost, IUserProfile } from "@/models";
import { baseURL } from "@/config/axios";
import { Link } from "react-router-dom";
import { pathLinkProfile } from "@/utils/pathRoute";
// import { useDispatch } from "react-redux";

type PropsType = React.PropsWithChildren<{
  currentUser: IUserProfile | null;
  authorPost: IUserProfile | null;
  post: IPost | null;
  dispatch?: any;
}>;

const TooltipCardUser: React.FC<PropsType> = ({ authorPost, post, currentUser, dispatch }) => {
  const handleFollowing = () => {
    console.log(authorPost?.user.public_id !== currentUser?.user.public_id)
  };
  return (
    <div className="TooltipCardUser">
      <div className="content">
        <div className="tooltip-header">
          <Link to={pathLinkProfile(authorPost?.pseudo as string)}>
            <img
              src={baseURL + (authorPost?.profilePicture as string)}
              alt={`profile of ${authorPost?.pseudo}`}
            />
          </Link>
          {authorPost?.user.public_id !== currentUser?.user.public_id && (
            <ButtonCustom text="Following" handleClick={handleFollowing} />
          )}
        </div>
        <div className="username">
          <Link to={pathLinkProfile(authorPost?.pseudo as string)}>
            <strong>
              {authorPost?.user.first_name} {authorPost?.user.last_name}
            </strong>
          </Link>
          <Link to={pathLinkProfile(authorPost?.pseudo as string)}>
            <span>@{authorPost?.pseudo}</span>
          </Link>
        </div>
        <p className="bio">{authorPost?.bio}</p>
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
