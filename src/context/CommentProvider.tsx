import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IEmojiData } from "emoji-picker-react";

import {
  bodyStateType,
  emojiStateType,
  IUserProfile,
  imagePreviewStateType,
  imageStateType,
  IRootState,
  editBodyStateType,
} from "@/models";
import updatePostAction from "@/actions/post/updatePost.action";
import addNewCommentAction from "@/actions/comment/addNewComment.action";
import getAllPostAction from "@/actions/post/getAllPost.action";
import deleteCommentAction from "@/actions/comment/deleteComment.action";

type ContextPropsType = {
  modal: { modalActive: boolean; setModalActive: () => void };
  popup: { popupActive: boolean; setPopupActive: () => void };
  postPublicIdState: { postPublicId: string; setPostPublicId: (value: string) => void };
  publicIdState: { publicId: string; setPublicId: (value: string) => void };
  popupDelete: { popupActiveDelete: boolean; setPopupActiveDelete: () => void };
  currentUser: IUserProfile | null;
  bodyState: bodyStateType;
  emojiState: emojiStateType;
  imageState: imageStateType;
  imagePreviewState: imagePreviewStateType;
  isEditState: { isEditing: boolean; setIsEditing: () => void };
  editBodyState: editBodyStateType;
  editImage: File | null;
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
  const posts = useSelector((state: IRootState) => state.postReducer);

  const dispatch = useDispatch();
  const [modalActive, setModalActive] = React.useState<boolean>(false);
  const [popupActive, setPopupActive] = React.useState<boolean>(false);
  const [postPublicId, setPostPublicId] = React.useState<string>("");
  const [publicId, setPublicId] = React.useState<string>("");
  const [popupActiveDelete, setPopupActiveDelete] = React.useState<boolean>(false);
  const [body, setBody] = React.useState<string>("");
  const [chosenEmoji, setChosenEmoji] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [editBody, setEditBody] = React.useState<string>("");
  const [editImage, setEditImage] = React.useState<File | null>(null);
  const flag = React.useRef(false);

  React.useEffect(() => {
    if (!flag.current) {
      flag.current = true;
    }

    if (isEditing) {
      if (editImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(editImage);
      } else {
        setImagePreview(null);
      }
    } else {
      if (image) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(image);
      } else {
        setImagePreview(null);
      }
    }

    if (posts && isEditing) {
      posts.filter((post) => {
        if (post.publicId === publicId) {
          setEditBody(post.body);
          setImagePreview(post.image);
        }
        return post;
      });
    }
  }, [isEditing, image, editImage, posts, publicId, chosenEmoji]);

  const resetImage = () => {
    setImage(null);
    setEditImage(null);
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
      isEditing ? setEditImage(e.target.files[0]) : setImage(e.target.files[0]);
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
    setPostPublicId: (value: string) => setPostPublicId(value)
  };

  const handleDiscard = () => {
    setPublicId("");
    setBody("");
    setEditBody("");
    resetImage();
    setIsEditing(false);
    popupActive && setPopupActive(!popupActive);
    modalActive && setModalActive(!modalActive);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (postPublicId) {
      if (isEditing) {
        if (editBody && editImage) {
          const formData = await new FormData();
          await formData.append("postPublicId", postPublicId as string);
          await formData.append("body", editBody as string);
          await formData.append("image", editImage as any);
          await dispatch(updatePostAction(publicId, formData) as any);
        } else if (editBody) {
          const formData = await new FormData();
          await formData.append("postPublicId", postPublicId as string);
          await formData.append("body", editBody as string);
          await dispatch(updatePostAction(publicId, formData) as any);
        } else if (editImage) {
          const formData = await new FormData();
          await formData.append("postPublicId", postPublicId as any);
          await formData.append("image", editImage as any);
          await dispatch(updatePostAction(publicId, formData) as any);
        }
      } else {
        if (body && image) {
          const formData = await new FormData();
          await formData.append("postPublicId", postPublicId as string);
          await formData.append("message", body as string);
          await formData.append("image", image as any);
          await dispatch(addNewCommentAction(formData) as any);
        } else if (body) {
          const formData = await new FormData();
          await formData.append("postPublicId", postPublicId as string);
          await formData.append("message", body as string);
          await dispatch(addNewCommentAction(formData) as any);
        } else if (image) {
          const formData = await new FormData();
          await formData.append("postPublicId", postPublicId as any);
          await formData.append("image", image as any);
          await dispatch(addNewCommentAction(formData) as any);
        }
      }
      handleDiscard();
      dispatch(getAllPostAction() as any);
    } else alert("postPublicId est vide !");
  };

  const handleDeletePost = async () => {
    if (publicId) {
      await dispatch(deleteCommentAction(publicId) as any);
      dispatch(getAllPostAction() as any);
      popupActiveDelete && setPopupActiveDelete(!popupActiveDelete);
      setPublicId("");
    }
  };

  const handleCloseModal = () => {
    if (isEditing) {
      if (posts) {
        const post = posts.find((post) => post.publicId === publicId);
        if (editBody !== post?.body || editImage) {
          setPopupActive(!popupActive);
        } else {
          setModalActive(!modalActive);
          handleDiscard();
        }
      }
    } else {
      if (body || image) {
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
          imageState: { image, handleChangeImage },
          imagePreviewState: { imagePreview, setImagePreview },
          isEditState,
          editBodyState: { editBody, setEditBody },
          editImage,
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
