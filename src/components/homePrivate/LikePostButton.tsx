import React from "react";
import { useDispatch } from "react-redux";

import IconSVG from "@/widgets/IconSVG";
import { IUserProfile, IPost, IComment } from "@/models";
import likePostAction from "@/actions/post/likePost.action";
import getListPostsLikesAction from "@/actions/post/getListPostsLikes.action";

type propsTypes = {
  currentUser: IUserProfile | null;
  post: IPost | IComment | null;
  isDisplayNumLike: boolean;
};

const LikePostButton: React.FC<propsTypes> = ({ currentUser, post, isDisplayNumLike }) => {
  const dispatch = useDispatch();

  const handlLiked = async () => {
    if (currentUser && post) {
      await dispatch(likePostAction(post.publicId) as any);
      await dispatch(getListPostsLikesAction() as any);
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
