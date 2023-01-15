import React from "react";
import { useDispatch } from "react-redux";

import IconSVG from "@/widgets/IconSVG";
import likePostAction from "@/actions/post/likePost.action";
import likeCommentAction from "@/actions/comment/likeComment.action";
import getAllPostAction from "@/actions/post/getAllPost.action";
import getAllCommentAction from "@/actions/comment/getAllComment.action";
import { pushNotification } from "@/config/soket";
import { notificationType } from "@/context/NotificationProvider";
import { useNotificationContext } from "@/context/NotificationProvider";
import { IUserProfile, IPost, IComment } from "@/models";

type propsTypes = {
  type: string;
  currentUser: IUserProfile | null;
  post: IPost | IComment | null;
  isDisplayNumLike: boolean;
  postPublicIdRead?: string;
};

const LikePostButton: React.FC<propsTypes> = ({
  type,
  currentUser,
  post,
  isDisplayNumLike,
  postPublicIdRead,
}) => {
  const dispatch = useDispatch();
  const sokect = useNotificationContext();

  const handlLiked = async () => {
    if (type === "post") {
      if (currentUser && post) {
        await dispatch(likePostAction(post.publicId) as any);
        dispatch(getAllPostAction() as any);
        sokect &&
          setTimeout(() => pushNotification(sokect.clientRef.current, notificationType.likePost), 3000);
      }
    } else {
      if (post) {
        await dispatch(likeCommentAction(post.publicId) as any);
        dispatch(getAllCommentAction(postPublicIdRead as string) as any);
        sokect &&
          setTimeout(() => pushNotification(sokect.clientRef.current, notificationType.likeComment), 3000);
      }
    }
  };

  const defIsLked = (): number => {
    if (currentUser && post) {
      return post.liked.filter((like) => like.public_id === currentUser.user.public_id).length;
    }
    return 0;
  };

  return (
    <div className="like-unLike post-icon" onClick={() => handlLiked()}>
      {defIsLked() > 0 ? (
        <IconSVG iconName="like" fill="#F91880" />
      ) : (
        <IconSVG iconName="unLike" fill="#919090" />
      )}
      {isDisplayNumLike && <span className={defIsLked() > 0 ? "like" : ""}>{post?.liked.length}</span>}
    </div>
  );
};

export default LikePostButton;
