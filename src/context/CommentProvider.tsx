import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IEmojiData } from "emoji-picker-react";

import addNewCommentAction from "@/actions/comment/addNewComment.action";
import getAllPostAction from "@/actions/post/getAllPost.action";
import deleteCommentAction from "@/actions/comment/deleteComment.action";
import updateCommentAction from "@/actions/comment/updateComment.action";
import { baseURL } from "@/config/axios";
import {
  bodyStateType,
  emojiStateType,
  IUserProfile,
  IRootState,
  editBodyStateType,
  commentImagePreviewStateType,
  commentImageStateType,
} from "@/models";

type ContextPropsType = {
  modal: { modalActive: boolean; setModalActive: () => void };
  popup: { popupActive: boolean; setPopupActive: () => void };
  postPublicIdState: { postPublicId: string; setPostPublicId: (value: string) => void };
  publicIdState: { publicId: string; setPublicId: (value: string) => void };
  popupDelete: { popupActiveDelete: boolean; setPopupActiveDelete: () => void };
  currentUser: IUserProfile | null;
  bodyState: bodyStateType;
  emojiState: emojiStateType;
  commentImageState: commentImageStateType;
  CommentimagePreviewState: commentImagePreviewStateType;
  isEditState: { isEditing: boolean; setIsEditing: () => void };
  editBodyState: editBodyStateType;
  commentEditImage: File | null;
  onEmojiClick: (e: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetImage: () => void;
  handleDiscard: () => void;
  handleDeletePost: () => Promise<void>;
  handleCloseModal: () => void;
};

const CommentContext = React.createContext<ContextPropsType | null>(null);

const CommentProvider = ({ children }: React.PropsWithChildren) => {
  const currentUser = useSelector((state: IRootState) => state.authReducer.currentUser);
  const comments = useSelector((state: IRootState) => state.commentReducer);

  const dispatch = useDispatch();
  const [modalActive, setModalActive] = React.useState<boolean>(false);
  const [popupActive, setPopupActive] = React.useState<boolean>(false);
  const [postPublicId, setPostPublicId] = React.useState<string>("");
  const [publicId, setPublicId] = React.useState<string>("");
  const [popupActiveDelete, setPopupActiveDelete] = React.useState<boolean>(false);
  const [body, setBody] = React.useState<string>("");
  const [chosenEmoji, setChosenEmoji] = React.useState<boolean>(false);
  const [commentImage, setImage] = React.useState<File | null>(null);
  const [commentImagePreview, setcommentImagePreview] = React.useState<string | null>(null);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [editBody, setEditBody] = React.useState<string>("");
  const [commentEditImage, setCommentEditImage] = React.useState<File | null>(null);
  // const flag = React.useRef(false);

  React.useEffect(() => {
    if (isEditing) {
      if (commentEditImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setcommentImagePreview(reader.result as string);
        };
        reader.readAsDataURL(commentEditImage);
      } else {
        setcommentImagePreview(null);
      }
    } else {
      if (commentImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setcommentImagePreview(reader.result as string);
        };
        reader.readAsDataURL(commentImage);
      } else {
        setcommentImagePreview(null);
      }
    }

    if (comments && isEditing && !commentImage && !commentEditImage) {
      comments.filter((comment) => {
        if (comment.publicId === publicId) {
          setEditBody(comment.message);
          setcommentImagePreview(
            comment.image.includes(baseURL as string) ? comment.image : baseURL + comment.image
          );
        }
        return comment;
      });
    }
  }, [isEditing, commentImage, commentEditImage, comments, publicId, chosenEmoji, commentImagePreview]);

  const resetImage = async () => {
    await setImage(null);
    await setCommentEditImage(null);
    await setcommentImagePreview("");
  };

  const onEmojiClick = (e: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
    isEditing
      ? setEditBody((value) => value + emojiObject.emoji)
      : setBody((value) => value + emojiObject.emoji);
    setChosenEmoji(false);
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
    } else {
      isEditing ? setCommentEditImage(e.target.files[0]) : setImage(e.target.files[0]);
    }
  };

  const isEditState = {
    isEditing,
    setIsEditing: () => setIsEditing(!isEditing),
  };

  const modal = {
    modalActive,
    setModalActive: () => setModalActive(!modalActive),
  };

  const popup = {
    popupActive,
    setPopupActive: () => setPopupActive(!popupActive),
  };

  const popupDelete = {
    popupActiveDelete,
    setPopupActiveDelete: () => setPopupActiveDelete(!popupActiveDelete),
  };

  const publicIdState = {
    publicId,
    setPublicId: (value: string) => setPublicId(value),
  };

  const postPublicIdState = {
    postPublicId,
    setPostPublicId: (value: string) => setPostPublicId(value),
  };

  const handleDiscard = async () => {
    await setPublicId("");
    await setBody("");
    await setEditBody("");
    await resetImage();
    await setIsEditing(false);
    popupActive && setPopupActive(!popupActive);
    modalActive && setModalActive(!modalActive);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (postPublicId) {
      if (isEditing) {
        if (editBody && commentEditImage) {
          const formData = await new FormData();
          await formData.append("postPublicId", postPublicId as string);
          await formData.append("message", editBody as string);
          await formData.append("commentImage", commentEditImage as any);
          await dispatch(updateCommentAction(postPublicId, publicId, formData) as any);
        } else if (editBody) {
          const formData = await new FormData();
          await formData.append("postPublicId", postPublicId as string);
          await formData.append("message", editBody as string);
          await dispatch(updateCommentAction(postPublicId, publicId, formData) as any);
        } else if (commentEditImage) {
          const formData = await new FormData();
          await formData.append("postPublicId", postPublicId as string);
          await formData.append("commentImage", commentEditImage as any);
          await dispatch(updateCommentAction(postPublicId, publicId, formData) as any);
        }
      } else {
        if (body && commentImage) {
          const formData = await new FormData();
          await formData.append("postPublicId", postPublicId as string);
          await formData.append("message", body as string);
          await formData.append("commentImage", commentImage as any);
          await dispatch(addNewCommentAction(postPublicId, formData) as any);
        } else if (body) {
          const formData = await new FormData();
          await formData.append("postPublicId", postPublicId as string);
          await formData.append("message", body as string);
          await dispatch(addNewCommentAction(postPublicId, formData) as any);
        } else if (commentImage) {
          const formData = await new FormData();
          await formData.append("postPublicId", postPublicId as string);
          await formData.append("commentImage", commentImage as any);
          await dispatch(addNewCommentAction(postPublicId, formData) as any);
        }
      }
      handleDiscard();
      dispatch(getAllPostAction() as any);
    } else alert("postPublicId est vide !");
  };

  const handleDeletePost = async () => {
    if (publicId) {
      await dispatch(deleteCommentAction(postPublicId, publicId) as any);
      dispatch(getAllPostAction() as any);
      popupActiveDelete && setPopupActiveDelete(!popupActiveDelete);
      setPublicId("");
    }
  };

  const handleCloseModal = () => {
    if (isEditing) {
      if (comments) {
        const comment = comments.find((comment) => comment.publicId === publicId);
        if (editBody !== comment?.message || commentEditImage) {
          setPopupActive(!popupActive);
        } else {
          setModalActive(!modalActive);
          handleDiscard();
        }
      }
    } else {
      if (body || commentImage) {
        setPopupActive(!popupActive);
      } else {
        setModalActive(!modalActive);
      }
    }
  };

  return (
    <CommentContext.Provider
      value={
        {
          modal,
          popup,
          postPublicIdState,
          publicIdState,
          popupDelete,
          currentUser,
          bodyState: { body, setBody },
          emojiState: { chosenEmoji, setChosenEmoji },
          commentImageState: { commentImage, handleChangeImage },
          CommentimagePreviewState: { commentImagePreview, setcommentImagePreview },
          isEditState,
          editBodyState: { editBody, setEditBody },
          commentEditImage,
          onEmojiClick,
          handleSubmit,
          resetImage,
          handleDiscard,
          handleDeletePost,
          handleCloseModal,
        } as ContextPropsType
      }
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComment = (): ContextPropsType | null => {
  return React.useContext(CommentContext);
};

export default CommentProvider;
