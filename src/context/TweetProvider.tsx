import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IEmojiData } from "emoji-picker-react";

import addNewPostAction from "@/actions/post/addNewPost.action";
import deletePostAction from "@/actions/post/deletePost.action";
import updatePostAction from "@/actions/post/updatePost.action";
import { baseURL } from "@/config/axios";
import {
  bodyStateType,
  emojiStateType,
  IUserProfile,
  imagePreviewStateType,
  imageStateType,
  IRootState,
  editBodyStateType,
} from "@/models";

type ContextPropsType = {
  modal: { modalActive: boolean; setModalActive: () => void };
  popup: { popupActive: boolean; setPopupActive: () => void };
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

const TweetContext = React.createContext<ContextPropsType | null>(null);

const TweetProvider = ({ children }: React.PropsWithChildren) => {
  const currentUser = useSelector((state: IRootState) => state.authReducer.currentUser);
  const posts = useSelector((state: IRootState) => state.postReducer);

  const dispatch = useDispatch();
  const [modalActive, setModalActive] = React.useState<boolean>(false);
  const [popupActive, setPopupActive] = React.useState<boolean>(false);
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
          setImagePreview(post.image && post.image.includes(baseURL as string) ? post.image : baseURL + post.image);
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
    if (isEditing) {
      if (editBody && editImage) {
        const formData = new FormData();
        formData.append("body", editBody as string);
        formData.append("image", editImage as any);
        dispatch(updatePostAction(publicId, formData) as any);
      } else if (editBody) {
        const formData = new FormData();
        formData.append("body", editBody as string);
        dispatch(updatePostAction(publicId, formData) as any);
      } else if (editImage) {
        const formData = new FormData();
        formData.append("image", editImage as any);
        dispatch(updatePostAction(publicId, formData) as any);
      }
    } else {
      if (body && image) {
        const formData = new FormData();
        formData.append("body", body as string);
        formData.append("image", image as any);
        dispatch(addNewPostAction(formData) as any);
      } else if (body) {
        const formData = new FormData();
        formData.append("body", body as string);
        dispatch(addNewPostAction(formData) as any);
      } else if (image) {
        const formData = new FormData();
        formData.append("image", image as any);
        dispatch(addNewPostAction(formData) as any);
      }
    }
    handleDiscard();
  };

  const handleDeletePost = async () => {
    if (publicId) {
      dispatch(deletePostAction(publicId) as any);
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
    <TweetContext.Provider
      value={
        {
          modal,
          popup,
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
    </TweetContext.Provider>
  );
};

export const useTweet = (): ContextPropsType | null => {
  return React.useContext(TweetContext);
};

export default TweetProvider;
