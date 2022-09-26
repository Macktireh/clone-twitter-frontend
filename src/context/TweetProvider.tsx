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
} from "@/models";
import addNewPostAction from "@/actions/post/addNewPost.action";
import deletePostAction from "@/actions/post/deletePost.action";

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
  onEmojiClick: (e: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetImage: () => void;
  handleDiscard: () => void;
  handleDeletePost: () => Promise<void>;
};

const TweetContext = React.createContext<ContextPropsType | null>(null);

const TweetProvider = ({ children }: React.PropsWithChildren) => {
  const currentUser = useSelector((state: IRootState) => state.authReducer.currentUser);
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = React.useState(false);
  const [popupActive, setPopupActive] = React.useState(false);
  const [publicId, setPublicId] = React.useState("");
  const [popupActiveDelete, setPopupActiveDelete] = React.useState(false);
  const [body, setBody] = React.useState<string>("");
  const [chosenEmoji, setChosenEmoji] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  const resetImage = () => setImage(null);

  const onEmojiClick = (e: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
    setBody((value) => value + emojiObject.emoji);
    setChosenEmoji(false);
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
    } else {
      setImage(e.target.files[0]);
    }
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
    setBody("");
    resetImage();
    popupActive && setPopupActive(!popupActive);
    modalActive && setModalActive(!modalActive);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    handleDiscard();
  };

  const handleDeletePost = async () => {
    if (publicId) {
      dispatch(deletePostAction(publicId) as any);
      popupActiveDelete && setPopupActiveDelete(!popupActiveDelete);
      setPublicId("");
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
          onEmojiClick,
          handleSubmit,
          resetImage,
          handleDiscard,
          handleDeletePost,
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
