import React from "react";

import { IUserProfile } from "@/models";
import { Link } from "react-router-dom";
import { pathLinkProfile } from "@/utils/pathRoute";

type propsTypes = React.PropsWithChildren<{
  userData: IUserProfile | null;
  bio: boolean;
}>;

const SimpleCardUser: React.FC<propsTypes> = ({ children, userData, bio }) => {
  return (
    <div className="SimpleCardUser">
      <div className="tooltip-header">
        <Link to={pathLinkProfile(userData?.pseudo as string)}>
          <img src={userData?.profilePicture as string} alt={`profile of ${userData?.pseudo}`} />
        </Link>
        {children}
      </div>
      <div className="username">
        <Link to={pathLinkProfile(userData?.pseudo as string)}>
          <strong>
            {userData?.user.first_name} {userData?.user.last_name}
          </strong>
        </Link>
        <Link to={pathLinkProfile(userData?.pseudo as string)}>
          <span>@{userData?.pseudo}</span>
        </Link>
      </div>
      {bio && <p className="bio">{userData?.bio}</p>}
      <div className="follow">
        <Link to={`/${userData?.pseudo}/following`} className="numFollow">
          <strong>{userData?.following.length}</strong> Following
        </Link>
        <Link to={`/${userData?.pseudo}/followers`} className="numFollow">
          <strong>{userData?.followers.length}</strong> Followers
        </Link>
      </div>
    </div>
  );
};

export default SimpleCardUser;
