import React from "react";
import { Link, useNavigate } from "react-router-dom";

import IconSVG from "@/widgets/IconSVG";
import { INotif, IUserProfile } from "@/models";
import { notificationType } from "@/context/NotificationProvider";
import { pathLinkPostDetail, pathLinkProfile } from "@/utils/pathRoute";
import { privateRoutes } from "@/routes/private.routes";

type propsTypes = {
  notification: INotif | null;
  fromUser: IUserProfile;
};

const CardNotif: React.FC<propsTypes> = ({ notification, fromUser }) => {
  const navigate = useNavigate();

  const iconNotification = (type: string): JSX.Element => {
    switch (type) {
      case notificationType.addPost:
      case notificationType.addComment:
        return <IconSVG iconName="icon-notif-add" fill="#794BC4" />;

      case notificationType.likePost:
      case notificationType.likeComment:
        return <IconSVG iconName="like" fill="#F91880" />;

      case notificationType.following:
        return <img src="/static/svg/addUser.svg" alt="" />;

      default:
        return <IconSVG iconName="icon-notif-add" fill="#794BC4" />;
    }
  };

  const msgTypeNotification = (type: string): string => {
    switch (type) {
      case notificationType.addPost:
        return "added a new Tweet";

      case notificationType.likePost:
        return "liked your Tweet";

      case notificationType.likeComment:
        return "liked your ReTweet";

      case notificationType.following:
        return "follow you";

      default:
        return "";
    }
  };

  return (
    <div className="CardNotif">
      <div
        className="click"
        onClick={() =>
          notification?.typeNotif === notificationType.following
            ? navigate(`${pathLinkProfile(fromUser.pseudo)}/${privateRoutes.following.name}`)
            : notification && navigate(pathLinkPostDetail(fromUser.pseudo, notification.postPublicId))
        }
      ></div>
      <div className="warapper">
        <div className="icon">{iconNotification(notification?.typeNotif as string)}</div>
        <div className="content">
          <div className="box-img">
            <Link to={pathLinkProfile(fromUser.pseudo)}>
              <img src={fromUser.profilePicture as string} alt="" />
            </Link>
            <div className="svg-icon">
              <IconSVG iconName="3-dot" fill="#919090" />
            </div>
          </div>
          <div className="box-name">
            <strong>{`${fromUser.user.first_name} ${fromUser.user.last_name} ${msgTypeNotification(
              notification?.typeNotif as string
            )}`}</strong>
          </div>
          <div className="box-msg">
            <p>{notification?.post}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNotif;
