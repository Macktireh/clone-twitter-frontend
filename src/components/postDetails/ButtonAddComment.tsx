import React from "react";

import IconSVG from "@/widgets/IconSVG";
// import { useComment } from "@/context/CommentProvider";
import { IPost } from "@/models";
import { useTweetComment } from "@/context/TweetCommentProvider";

type propsTypes = {
  post: IPost | null;
  isDisplayNumComments: boolean;
};

const ButtonAddComment: React.FC<propsTypes> = ({ post, isDisplayNumComments }) => {
  const propsContext = useTweetComment();
  const postPublicIdState = propsContext?.postPublicIdState as {
    postPublicId: string;
    setPostPublicId: (value: string) => void;
  };

  const toggleModal = () => {
    if (post?.publicId) postPublicIdState.setPostPublicId(post.publicId);
    propsContext?.modalComment && propsContext.modalComment.setModalActiveComment();
  };

  return (
    <div className="reply post-icon" onClick={toggleModal}>
      <IconSVG iconName="reply" fill="#919090" />
      {isDisplayNumComments && <span>{post?.numberComments}</span>}
    </div>
  );
};

export default ButtonAddComment;
