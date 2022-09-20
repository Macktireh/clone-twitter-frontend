import React from "react";

import { IAuthUserProfile } from "@/models";
import { baseURL } from "@/config/axios";

type PropsType = React.PropsWithChildren<{
  nameClass?: string;
  currentUser?: IAuthUserProfile | null;
}>;

const UserCard: React.FC<PropsType> = ({ children, nameClass, currentUser }) => {
  return (
    <div className={nameClass ? `UserCard ${nameClass}` : "UserCard"}>
      <div className="img-and-name">
        <img
          src={
            currentUser?.profilePicture
              ? baseURL + currentUser.profilePicture
              : baseURL + "/mediafiles/default/profilePic.png"
          }
          alt=""
        />
        <div className="username">
          <strong>
            {currentUser?.user.first_name} {currentUser?.user.last_name}
          </strong>
          <p>@{currentUser?.pseudo}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default UserCard;
