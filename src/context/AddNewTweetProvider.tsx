import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IEmojiData } from "emoji-picker-react";

import {
  bodyStateType,
  emojiStateType,
  IAuthUserProfile,
  imagePreviewStateType,
  imageStateType,
  IStateReduce,
} from "@/models";
import addNewPostAction from "@/actions/post/addNewPost.action";

type ContextPropsType = {
  popup: { popupActive: boolean; setPopupActive: () => void };
  currentUser: IAuthUserProfile | null;
  bodyState: bodyStateType;
  emojiState: emojiStateType;
  imageState: imageStateType;
  imagePreviewState: imagePreviewStateType;
  onEmojiClick: (e: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetImage?: () => void;
};

const AddNewTweetContext = React.createContext<ContextPropsType | null>(null);

const AddNewTweetProvider = ({ children }: React.PropsWithChildren) => {
  const currentUser = useSelector((state: IStateReduce) => state.authReducer.currentUser);
  const dispatch = useDispatch();
  const [popupActive, setPopupActive] = React.useState(false);
  const [body, setBody] = React.useState<string>();
  const [chosenEmoji, setChosenEmoji] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<File | null>();
  const [imagePreview, setImagePreview] = React.useState<string | null>();

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

  const popup = {
    popupActive,
    setPopupActive: () => setPopupActive(!popupActive),
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
    setBody("");
    setImage(null);
  };

  return (
    <AddNewTweetContext.Provider
      value={
        {
          popup,
          currentUser,
          bodyState: { body, setBody },
          emojiState: { chosenEmoji, setChosenEmoji },
          imageState: { image, handleChangeImage },
          imagePreviewState: { imagePreview, setImagePreview },
          onEmojiClick,
          resetImage,
          handleSubmit,
        } as ContextPropsType
      }
    >
      {children}
    </AddNewTweetContext.Provider>
  );
};

export const useAddNewTweet = (): ContextPropsType | null => {
  return React.useContext(AddNewTweetContext);
};

export default AddNewTweetProvider;
