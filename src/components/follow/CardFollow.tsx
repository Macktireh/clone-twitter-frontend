import React from "react";
import { useNavigate } from "react-router-dom";

import ButtonFollow from "@/components/follow/ButtonFollow";
import { IUser, IUserProfile } from "@/models";
import { pathLinkProfile } from "@/utils/pathRoute";

type propsTypes = {
  userFollower: IUser | null;
  typeFollow: number;
  user: IUser | null;
  currentUser: IUserProfile | null;
  bio: boolean;
};

const CardFollow: React.FC<propsTypes> = ({ bio, typeFollow, userFollower, user, currentUser }) => {
  const navigate = useNavigate();
  return (
    <div className="CardFollow">
      <div
        className="click"
        onClick={() => userFollower && navigate(pathLinkProfile(userFollower.pseudo))}
      ></div>
      <div className="box">
        <div className="img-container">
          <img
            src={userFollower?.profilePicture as string}
            alt={`${userFollower?.first_name} ${userFollower?.last_name}`}
          />
        </div>
        <div className="info-container">
          <div className="top">
            <div className="username">
              <strong>{`${userFollower?.first_name} ${userFollower?.last_name}`}</strong>
              <span>@{userFollower?.pseudo}</span>
            </div>
            {currentUser?.user.public_id !== userFollower?.public_id ? (
              <ButtonFollow
                typeFollow={typeFollow}
                userPubblicId={user?.public_id as string}
                userFollowing={userFollower?.public_id as string}
              />
            ) : (
              <div className="btn">
                <span className="vous">Vous</span>
              </div>
            )}
          </div>
          {bio ? <p>{userFollower?.bio}</p> : null}
        </div>
      </div>
    </div>
  );
};

export default CardFollow;
