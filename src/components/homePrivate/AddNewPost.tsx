import React from "react";

import Picker, { IEmojiData } from "emoji-picker-react";

import IconSVG from "@/widgets/IconSVG";
import ButtonCoustom from "@/widgets/ButtonCustom";
import { bodyStateType, emojiStateType, IUserProfile, imagePreviewStateType, imageStateType } from "@/models";
import { baseURL } from "@/config/axios";
import { useAddNewTweet } from "@/context/AddNewTweetProvider";

type PropsType = {
  currentUser: IUserProfile | null;
  bodyState: bodyStateType;
  emojiState: emojiStateType;
  imageState: imageStateType;
  imagePreviewState: imagePreviewStateType;
  onEmojiClick: (e: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetImage: () => void;
};

const AddNewPost: React.FC<PropsType> = ({
  currentUser,
  bodyState,
  emojiState,
  imageState,
  imagePreviewState,
  onEmojiClick,
  handleSubmit,
  resetImage,
}) => {
  const { body, setBody } = bodyState;
  const { chosenEmoji, setChosenEmoji } = emojiState;
  const { image, handleChangeImage } = imageState;
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const textarea = document.querySelector("textarea");
    textarea?.addEventListener("input", (e) => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    });
  });

  const resetInputFile = async () => {
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  return (
    <div className="AddNewPost">
      <div className="box-img">
        <img
          src={
            currentUser?.profilePicture
              ? baseURL + currentUser.profilePicture
              : baseURL + "/mediafiles/default/profilePic.png"
          }
          alt=""
        />
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="textarea">
          <textarea placeholder="What's happening?" value={body} onChange={(e) => setBody(e.target.value)} />
          {imagePreviewState.imagePreview && (
            <div className="img-preview-container">
              <img src={imagePreviewState.imagePreview} alt="imagePostPreview" />
              <div className="close" onClick={() => resetImage()}>
                <IconSVG iconName="close" />
              </div>
            </div>
          )}
        </div>
        <div className="form-btn">
          <div className="input-icon">
            <label htmlFor="file" className="form-lable">
              <input
                type="file"
                name="img"
                id="file"
                className="form-input-file"
                hidden
                onChange={(e) => handleChangeImage(e)}
                onClick={resetInputFile}
                ref={imageInputRef}
              />
              <IconSVG iconName="add-post-img" fill="#1d9bf0" />
            </label>
            <IconSVG iconName="gif" fill="#1d9bf0" />
            <IconSVG iconName="pol" fill="#1d9bf0" />
            <IconSVG
              iconName="emoji"
              nameClass="emoji"
              fill="#1d9bf0"
              handleClick={() => setChosenEmoji(!chosenEmoji)}
            />
            <IconSVG iconName="schedule" fill="#1d9bf0" />
          </div>
          <div className="box-btn">
            <ButtonCoustom text="Tweet" isDisabled={body || image ? false : true} />
          </div>
        </div>
        <div className="emojiPicker">
          {chosenEmoji && <Picker onEmojiClick={onEmojiClick} searchPlaceholder="Search Emoji" />}
        </div>
      </form>
    </div>
  );
};

const AddNewPostLogical: React.FC = () => {
  const propsContext = useAddNewTweet();
  const currentUser = propsContext?.currentUser as IUserProfile;
  const bodyState = propsContext?.bodyState as bodyStateType;
  const emojiState = propsContext?.emojiState as emojiStateType;
  const imageState = propsContext?.imageState as imageStateType;
  const imagePreviewState = propsContext?.imagePreviewState as imagePreviewStateType;
  const onEmojiClick = propsContext?.onEmojiClick as (
    e: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData
  ) => void;
  const handleSubmit = propsContext?.handleSubmit as (e: React.FormEvent<HTMLFormElement>) => void;
  const resetImage = propsContext?.resetImage as () => void;

  return (
    <AddNewPost
      currentUser={currentUser}
      bodyState={bodyState}
      emojiState={emojiState}
      imageState={imageState}
      imagePreviewState={imagePreviewState}
      onEmojiClick={onEmojiClick}
      handleSubmit={handleSubmit}
      resetImage={resetImage}
    />
  );
};

export default AddNewPostLogical;
