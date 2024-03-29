import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import IconSVG from "@/widgets/IconSVG";
import { INotif, IUserProfile } from "@/models";
import { notificationType } from "@/context/NotificationProvider";
import { pathLinkPostDetail, pathLinkProfile } from "@/utils/pathRoute";
import { privateRoutes } from "@/routes/private.routes";
import readNotificationAction from "@/actions/notification/readNotification.action";

type propsTypes = {
  currentUser: IUserProfile | null;
  notification: INotif | null;
  fromUser: IUserProfile;
};

const CardNotif: React.FC<propsTypes> = ({ currentUser, notification, fromUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

      case notificationType.addComment:
        return "added a retweet to your Tweet";

      case notificationType.following:
        return "follow you";

      default:
        return "";
    }
  };

  const handleClick = () => {
    dispatch(readNotificationAction(notification?.publicId as string) as any);
    // notification?.typeNotif === notificationType.following
    //   ? navigate(`${pathLinkProfile(currentUser?.pseudo as string)}/${privateRoutes.followers.name}`)
    //   : notification && currentUser && navigate(pathLinkPostDetail(currentUser.pseudo, notification.postPublicId));
    if (notification) {
      switch (notification.typeNotif) {
        case notificationType.following:
          navigate(`${pathLinkProfile(currentUser?.pseudo as string)}/${privateRoutes.followers.name}`);
          break;
        case notificationType.addPost:
          notification && navigate(pathLinkPostDetail(fromUser.pseudo, notification.postPublicId));
          break;
        default:
          notification &&
            currentUser &&
            navigate(pathLinkPostDetail(currentUser.pseudo, notification.postPublicId));
      }
    }
  };

  return (
    <div className={notification?.read ? "CardNotif" : "CardNotif no-read"}>
      <div className="click" onClick={handleClick}></div>
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
            <p>
              {notification?.typeNotif === notificationType.likeComment ||
              notification?.typeNotif === notificationType.addComment
                ? notification.comment
                : notification?.post}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNotif;
