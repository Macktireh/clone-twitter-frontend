import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IEmojiData } from "emoji-picker-react";

import addNewPostAction from "@/actions/post/addNewPost.action";
import deletePostAction from "@/actions/post/deletePost.action";
import updatePostAction from "@/actions/post/updatePost.action";
import updateCommentAction from "@/actions/comment/updateComment.action";
import addNewCommentAction from "@/actions/comment/addNewComment.action";
import deleteCommentAction from "@/actions/comment/deleteComment.action";
import getAllPostAction from "@/actions/post/getAllPost.action";
import { notificationType, useNotificationContext } from "@/context/NotificationProvider";
import { useNotifyContext } from "@/context/NotifyProvider";
import { pushNotification } from "@/config/soket";
import { IUserProfile, IRootState } from "@/models";

export type bodyPostStateType = { bodyPost: string; setBodyPost: (value: string) => void };
export type emojiPostStateType = { chosenEmojiPost: boolean; setChosenEmojiPost: (value: boolean) => void };
export type imagePostStateType = {
  imagePost: File | null;
  handleChangeImagePost: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export type editBodyPostStateType = { editBodyPost: string; setEditBodyPost: (value: string) => void };
export type imagePreviewPostStateType = {
  imagePreviewPost: string;
  setImagePreviewPost: (value: string) => void;
};

export type bodyCommentStateType = { bodyComment: string; setBodyComment: (value: string) => void };
export type emojiCommentStateType = {
  chosenEmojiComment: boolean;
  setChosenEmojiComment: (value: boolean) => void;
};
export type imageCommentStateType = {
  imageComment: File | null;
  handleChangeImageComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export type editBodyCommentStateType = {
  editBodyComment: string;
  setEditBodyComment: (value: string) => void;
};
export type imagePreviewCommentStateType = {
  imagePreviewComment: string;
  setImagePreviewComment: (value: string) => void;
};

export type TweetCommentContextPropsType = {
  currentUser: IUserProfile | null;
  // Post ContextProps
  modalPost: { modalActivePost: boolean; setModalActivePost: () => void };
  popupPost: { popupActivePost: boolean; setPopupActivePost: () => void };
  popupDeletePost: { popupActiveDeletePost: boolean; setPopupActiveDeletePost: () => void };
  postPublicIdState: { postPublicId: string; setPostPublicId: (value: string) => void };
  bodyPostState: bodyPostStateType;
  emojiPostState: emojiPostStateType;
  imagePostState: imagePostStateType;
  imagePreviewPostState: imagePreviewPostStateType;
  isEditPostState: { isEditingPost: boolean; setIsEditingPost: () => void };
  editBodyPostState: editBodyPostStateType;
  editImagePost: File | null;
  onEmojiClickPost: (e: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => void;
  handleSubmitPost: (e: React.FormEvent<HTMLFormElement>) => void;
  resetImagePost: () => void;
  handleDiscardPost: () => void;
  handleDeletePost: () => Promise<void>;
  handleCloseModalPost: () => void;
  // Comment ContextProps
  modalComment: { modalActiveComment: boolean; setModalActiveComment: () => void };
  popupComment: { popupActiveComment: boolean; setPopupActiveComment: () => void };
  popupDeleteComment: { popupActiveDeleteComment: boolean; setPopupActiveDeleteComment: () => void };
  commentPublicIdState: { commentPublicId: string; setCommentPublicId: (value: string) => void };
  bodyCommentState: bodyCommentStateType;
  emojiCommentState: emojiCommentStateType;
  imageCommentState: imageCommentStateType;
  imagePreviewCommentState: imagePreviewCommentStateType;
  isEditCommentState: { isEditingComment: boolean; setIsEditingComment: () => void };
  editBodyCommentState: editBodyCommentStateType;
  editImageComment: File | null;
  onEmojiClickComment: (e: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => void;
  handleSubmitComment: (e: React.FormEvent<HTMLFormElement>) => void;
  resetImageComment: () => void;
  handleDiscardComment: () => void;
  handleDeleteComment: () => Promise<void>;
  handleCloseModalComment: () => void;
};

const TweetCommentContext = React.createContext<TweetCommentContextPropsType | null>(null);

const TweetCommentProvider = ({ children }: React.PropsWithChildren) => {
  const currentUser = useSelector((state: IRootState) => state.authReducer.currentUser);
  const posts = useSelector((state: IRootState) => state.postReducer);
  const comments = useSelector((state: IRootState) => state.commentReducer);
  const dispatch = useDispatch();
  const sokect = useNotificationContext();

  const notifyContext = useNotifyContext();

  // Post State
  const [modalActivePost, setModalActivePost] = React.useState<boolean>(false);
  const [popupActivePost, setPopupActivePost] = React.useState<boolean>(false);
  const [postPublicId, setPostPublicId] = React.useState<string>("");
  const [popupActiveDeletePost, setPopupActiveDeletePost] = React.useState<boolean>(false);
  const [bodyPost, setBodyPost] = React.useState<string>("");
  const [chosenEmojiPost, setChosenEmojiPost] = React.useState<boolean>(false);
  const [imagePost, setImagePost] = React.useState<File | null>(null);
  const [imagePreviewPost, setImagePreviewPost] = React.useState<string | null>(null);
  const [isEditingPost, setIsEditingPost] = React.useState<boolean>(false);
  const [editBodyPost, setEditBodyPost] = React.useState<string>("");
  const [editImagePost, setEditImagePost] = React.useState<File | null>(null);
  // const flag = React.useRef(false);

  // Comment State
  const [modalActiveComment, setModalActiveComment] = React.useState<boolean>(false);
  const [popupActiveComment, setPopupActiveComment] = React.useState<boolean>(false);
  const [commentPublicId, setCommentPublicId] = React.useState<string>("");
  const [popupActiveDeleteComment, setPopupActiveDeleteComment] = React.useState<boolean>(false);
  const [bodyComment, setBodyComment] = React.useState<string>("");
  const [chosenEmojiComment, setChosenEmojiComment] = React.useState<boolean>(false);
  const [imageComment, setImageComment] = React.useState<File | null>(null);
  const [imagePreviewComment, setImagePreviewComment] = React.useState<string | null>(null);
  const [isEditingComment, setIsEditingComment] = React.useState<boolean>(false);
  const [editBodyComment, setEditBodyComment] = React.useState<string>("");
  const [editImageComment, setEditImageComment] = React.useState<File | null>(null);

  React.useEffect(() => {
    // Post
    if (isEditingPost) {
      if (editImagePost) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviewPost(reader.result as string);
        };
        reader.readAsDataURL(editImagePost);
      } else {
        setImagePreviewPost(null);
      }
    } else {
      if (imagePost) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviewPost(reader.result as string);
        };
        reader.readAsDataURL(imagePost);
      } else {
        setImagePreviewPost(null);
      }
    }
    if (posts && isEditingPost) {
      posts.filter((post) => {
        if (post.publicId === postPublicId) {
          if (editBodyPost === "" || editBodyPost === post.body) {
            setEditBodyPost(post.body);
          }
          setImagePreviewPost(
            post.image
            // post.image ? (post.image.includes(baseURL as string) ? post.image : baseURL + post.image) : ""
          );
        }
        return post;
      });
    }

    // Comment ...
    if (isEditingComment) {
      if (editImageComment) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviewComment(reader.result as string);
        };
        reader.readAsDataURL(editImageComment);
      } else {
        setImagePreviewComment(null);
      }
    } else {
      if (imageComment) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviewComment(reader.result as string);
        };
        reader.readAsDataURL(imageComment);
      } else {
        setImagePreviewComment(null);
      }
    }
    if (comments && isEditingComment) {
      comments.filter((comment) => {
        if (comment.publicId === commentPublicId) {
          if (editBodyComment === "" || editBodyComment === comment.message) {
            setEditBodyComment(comment.message);
          }
          setImagePreviewComment(comment.image);
        }
        return comment;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isEditingPost,
    imagePost,
    editImagePost,
    posts,
    postPublicId,
    chosenEmojiPost,
    isEditingComment,
    imageComment,
    editImageComment,
    comments,
    commentPublicId,
    chosenEmojiComment,
  ]);

  const resetImagePost = () => {
    setImagePost(null);
    setEditImagePost(null);
  };

  const onEmojiClickPost = (e: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
    isEditingPost
      ? setEditBodyPost((value) => value + emojiObject.emoji)
      : setBodyPost((value) => value + emojiObject.emoji);
    setChosenEmojiPost(false);
  };

  const handleChangeImagePost = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
    } else {
      isEditingPost ? setEditImagePost(e.target.files[0]) : setImagePost(e.target.files[0]);
    }
  };

  const isEditPostState = {
    isEditingPost,
    setIsEditingPost: () => setIsEditingPost(!isEditingPost),
  };

  const modalPost = {
    modalActivePost,
    setModalActivePost: () => setModalActivePost(!modalActivePost),
  };

  const popupPost = {
    popupActivePost,
    setPopupActivePost: () => setPopupActivePost(!popupActivePost),
  };

  const popupDeletePost = {
    popupActiveDeletePost,
    setPopupActiveDeletePost: () => setPopupActiveDeletePost(!popupActiveDeletePost),
  };

  const postPublicIdState = {
    postPublicId,
    setPostPublicId: (value: string) => setPostPublicId(value),
  };

  const handleDiscardPost = () => {
    setPostPublicId("");
    setBodyPost("");
    setEditBodyPost("");
    resetImagePost();
    setIsEditingPost(false);
    popupActivePost && setPopupActivePost(!popupActivePost);
    modalActivePost && setModalActivePost(!modalActivePost);
  };

  const handleSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditingPost) {
      if (editBodyPost && editImagePost) {
        const formData = new FormData();
        formData.append("body", editBodyPost as string);
        formData.append("image", editImagePost as any);
        dispatch(updatePostAction(postPublicId, formData) as any).then((res: any) => {
          if (res && res.type === "file size error") {
            notifyContext?.notify(notifyContext.typeNotify.error, res.message);
          }
        });
      } else if (editBodyPost) {
        const formData = new FormData();
        formData.append("body", editBodyPost as string);
        dispatch(updatePostAction(postPublicId, formData) as any);
      } else if (editImagePost) {
        const formData = new FormData();
        formData.append("image", editImagePost as any);
        dispatch(updatePostAction(postPublicId, formData) as any).then((res: any) => {
          if (res && res.type === "file size error") {
            notifyContext?.notify(notifyContext.typeNotify.error, res.message);
          }
        });
      }
      notifyContext?.notify(notifyContext.typeNotify.default, "Your Tweet has been modified.");
    } else {
      if (bodyPost && imagePost) {
        const formData = new FormData();
        formData.append("body", bodyPost as string);
        formData.append("image", imagePost as any);
        dispatch(addNewPostAction(formData) as any).then((res: any) => {
          if (res && res.type === "file size error") {
            notifyContext?.notify(notifyContext.typeNotify.error, res.message);
          }
        });
      } else if (bodyPost) {
        const formData = new FormData();
        formData.append("body", bodyPost as string);
        dispatch(addNewPostAction(formData) as any);
      } else if (imagePost) {
        const formData = new FormData();
        formData.append("image", imagePost as any);
        dispatch(addNewPostAction(formData) as any).then((res: any) => {
          if (res && res.type === "file size error") {
            notifyContext?.notify(notifyContext.typeNotify.error, res.message);
          }
        });
      }
      notifyContext?.notify(notifyContext.typeNotify.default, "Your Tweet was sent.");
    }
    handleDiscardPost();
    sokect && setTimeout(() => pushNotification(sokect.clientRef.current, notificationType.addPost), 3000);
  };

  const handleDeletePost = async () => {
    if (postPublicId) {
      dispatch(deletePostAction(postPublicId) as any);
      popupActiveDeletePost && setPopupActiveDeletePost(!popupActiveDeletePost);
      setPostPublicId("");
      notifyContext?.notify(notifyContext.typeNotify.default, "Your Tweet was deleted.");
      sokect &&
        setTimeout(() => pushNotification(sokect.clientRef.current, notificationType.deletePost), 3000);
    }
  };

  const handleCloseModalPost = () => {
    if (isEditingPost) {
      if (posts) {
        const post = posts.find((post) => post.publicId === postPublicId);
        if (editBodyPost !== post?.body || editImagePost) {
          setPopupActivePost(!popupActivePost);
        } else {
          setModalActivePost(!modalActivePost);
          handleDiscardPost();
        }
      }
    } else {
      if (bodyPost || imagePost) {
        setPopupActivePost(!popupActivePost);
      } else {
        setModalActivePost(!modalActivePost);
      }
    }
  };

  /*****************************************************************************************
    Comment
  ******************************************************************************************/
  const resetImageComment = async () => {
    // await setImageComment(null);
    setTimeout(() => setImageComment(null), 200);
    await setEditImageComment(null);
    setImagePreviewComment(null);
  };

  const onEmojiClickComment = (e: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
    isEditingComment
      ? setEditBodyComment((value) => value + emojiObject.emoji)
      : setBodyComment((value) => value + emojiObject.emoji);
    setChosenEmojiComment(false);
  };

  const handleChangeImageComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
    } else {
      isEditingComment ? setEditImageComment(e.target.files[0]) : setImageComment(e.target.files[0]);
    }
  };

  const isEditCommentState = {
    isEditingComment,
    setIsEditingComment: () => setIsEditingComment(!isEditingComment),
  };

  const modalComment = {
    modalActiveComment,
    setModalActiveComment: () => setModalActiveComment(!modalActiveComment),
  };

  const popupComment = {
    popupActiveComment,
    setPopupActiveComment: () => setPopupActiveComment(!popupActiveComment),
  };

  const popupDeleteComment = {
    popupActiveDeleteComment,
    setPopupActiveDeleteComment: () => setPopupActiveDeleteComment(!popupActiveDeleteComment),
  };

  const commentPublicIdState = {
    commentPublicId,
    setCommentPublicId: (value: string) => setCommentPublicId(value),
  };

  const handleDiscardComment = () => {
    setCommentPublicId("");
    setBodyComment("");
    setEditBodyComment("");
    resetImageComment();
    setIsEditingComment(false);
    popupActiveComment && setPopupActiveComment(!popupActiveComment);
    modalActiveComment && setModalActiveComment(!modalActiveComment);
  };

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditingComment) {
      if (editBodyComment && editImageComment) {
        const formData = new FormData();
        await formData.append("postPublicId", postPublicId as string);
        formData.append("message", editBodyComment as string);
        formData.append("image", editImageComment as any);
        dispatch(updateCommentAction(postPublicId, commentPublicId, formData) as any);
      } else if (editBodyComment) {
        const formData = new FormData();
        await formData.append("postPublicId", postPublicId as string);
        formData.append("message", editBodyComment as string);
        dispatch(updateCommentAction(postPublicId, commentPublicId, formData) as any);
      } else if (editImageComment) {
        const formData = new FormData();
        await formData.append("postPublicId", postPublicId as string);
        formData.append("image", editImageComment as any);
        dispatch(updateCommentAction(postPublicId, commentPublicId, formData) as any);
      }
      notifyContext?.notify(notifyContext.typeNotify.default, "Your ReTweet has been modified.");
    } else {
      if (bodyComment && imageComment) {
        const formData = new FormData();
        await formData.append("postPublicId", postPublicId as string);
        formData.append("message", bodyComment as string);
        formData.append("image", imageComment as any);
        await dispatch(addNewCommentAction(postPublicId, formData) as any);
      } else if (bodyComment) {
        const formData = new FormData();
        await formData.append("postPublicId", postPublicId as string);
        formData.append("message", bodyComment as string);
        await dispatch(addNewCommentAction(postPublicId, formData) as any);
      } else if (imageComment) {
        const formData = new FormData();
        await formData.append("postPublicId", postPublicId as string);
        formData.append("image", imageComment as any);
        await dispatch(addNewCommentAction(postPublicId, formData) as any);
      }
      dispatch(getAllPostAction() as any);
      notifyContext?.notify(notifyContext.typeNotify.default, "Your ReTweet was sent.");
    }
    handleDiscardComment();
    sokect && setTimeout(() => pushNotification(sokect.clientRef.current, notificationType.addComment), 3000);
  };

  const handleDeleteComment = async () => {
    if (commentPublicId) {
      await dispatch(deleteCommentAction(postPublicId, commentPublicId) as any);
      dispatch(getAllPostAction() as any);
      popupActiveDeleteComment && setPopupActiveDeleteComment(!popupActiveDeleteComment);
      setCommentPublicId("");
      notifyContext?.notify(notifyContext.typeNotify.default, "Your ReTweet was deleted.");
      sokect &&
        setTimeout(() => pushNotification(sokect.clientRef.current, notificationType.deleteComment), 3000);
    }
  };

  const handleCloseModalComment = () => {
    if (isEditingComment) {
      if (posts) {
        const post = posts.find((post) => post.publicId === postPublicId);
        if (editBodyComment !== post?.body || editImageComment) {
          setPopupActiveComment(!popupActiveComment);
        } else {
          setModalActiveComment(!modalActiveComment);
          handleDiscardComment();
        }
      }
    } else {
      if (bodyComment || imageComment) {
        setPopupActiveComment(!popupActiveComment);
      } else {
        setModalActiveComment(!modalActiveComment);
      }
    }
  };

  return (
    <TweetCommentContext.Provider
      value={
        {
          currentUser,
          // post ...
          modalPost,
          popupPost,
          postPublicIdState,
          popupDeletePost,
          bodyPostState: { bodyPost, setBodyPost },
          emojiPostState: { chosenEmojiPost, setChosenEmojiPost },
          imagePostState: { imagePost, handleChangeImagePost },
          imagePreviewPostState: { imagePreviewPost, setImagePreviewPost },
          isEditPostState,
          editBodyPostState: { editBodyPost, setEditBodyPost },
          editImagePost,
          onEmojiClickPost,
          handleSubmitPost,
          resetImagePost,
          handleDiscardPost,
          handleDeletePost,
          handleCloseModalPost,
          // comment ...
          modalComment,
          popupComment,
          commentPublicIdState,
          popupDeleteComment,
          bodyCommentState: { bodyComment, setBodyComment },
          emojiCommentState: { chosenEmojiComment, setChosenEmojiComment },
          imageCommentState: { imageComment, handleChangeImageComment },
          imagePreviewCommentState: { imagePreviewComment, setImagePreviewComment },
          isEditCommentState,
          editBodyCommentState: { editBodyComment, setEditBodyComment },
          editImageComment,
          onEmojiClickComment,
          handleSubmitComment,
          resetImageComment,
          handleDiscardComment,
          handleDeleteComment,
          handleCloseModalComment,
        } as TweetCommentContextPropsType
      }
    >
      {children}
    </TweetCommentContext.Provider>
  );
};

export const useTweetComment = (): TweetCommentContextPropsType | null => {
  return React.useContext(TweetCommentContext);
};

export default TweetCommentProvider;
