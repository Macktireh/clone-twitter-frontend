import React from "react";
import { useDispatch } from "react-redux";

import IconSVG from "@/widgets/IconSVG";
import { IUserProfile, IPost } from "@/models";
import likePostAction from "@/actions/post/likePost.action";

type PropsType = {
  currentUser: IUserProfile | null;
  post: IPost | null;
  likePostAction?: (public_id: string) => void;
};

const LikePostButton: React.FC<PropsType> = ({ currentUser, post }) => {
  const [isLiked, setIsLked] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (currentUser && post)
      post.liked.map((like) =>
        like.public_id === currentUser.user.public_id ? setIsLked(true) : setIsLked(false)
      );
  }, [currentUser, post]);

  const handlLiked = async () => {
    if (currentUser && post) {
      await dispatch(likePostAction(post.publicId as string) as any);
      setIsLked(!isLiked);
    }
  };

  return (
    <div className="like-unLike post-icon" onClick={() => handlLiked()}>
      {isLiked ? <IconSVG iconName="like" fill="#F91880" /> : <IconSVG iconName="unLike" fill="#919090" />}
      <span className={isLiked ? "like" : ""}>{post?.liked.length}</span>
    </div>
  );
};

export default LikePostButton;
