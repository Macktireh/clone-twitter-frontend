import React from "react";

import Picker, { IEmojiData } from "emoji-picker-react";
// import Tippy from "@tippyjs/react";

import IconSVG from "@/widgets/IconSVG";
import ButtonCoustom from "@/widgets/ButtonCustom";
import {
  bodyStateType,
  emojiStateType,
  IUserProfile,
  imagePreviewStateType,
  imageStateType,
  editBodyStateType,
} from "@/models";
import { baseURL } from "@/config/axios";
import { useTweet } from "@/context/TweetProvider";
import { Link } from "react-router-dom";
import { pathLinkProfile } from "@/utils/pathRoute";

type propsTypes = {
  nameClass: string;
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
};

const AddNewPost: React.FC<propsTypes> = ({
  nameClass,
  currentUser,
  bodyState,
  emojiState,
  imageState,
  imagePreviewState,
  isEditState,
  editBodyState,
  editImage,
  onEmojiClick,
  handleSubmit,
  resetImage,
}) => {
  const { body, setBody } = bodyState;
  const { chosenEmoji, setChosenEmoji } = emojiState;
  const { image, handleChangeImage } = imageState;
  const { editBody, setEditBody } = editBodyState;
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const textarea = document.getElementById(nameClass);
    if (textarea) {
      textarea.addEventListener("input", (e: any) => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      });
    }
  });

  const resetInputFile = async () => {
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  return (
    <>
      <div className="AddNewPost">
        <div className="box-img">
          <Link to={pathLinkProfile(currentUser?.pseudo as string)}>
            <img
              src={
                currentUser?.profilePicture
                  ? baseURL + currentUser.profilePicture
                  : baseURL + "/mediafiles/default/profilePic.png"
              }
              alt=""
            />
          </Link>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="textarea-image">
            <textarea
              id={nameClass}
              placeholder="What's happening?"
              value={isEditState.isEditing ? editBody : body}
              onChange={(e) =>
                isEditState.isEditing ? setEditBody(e.target.value) : setBody(e.target.value)
              }
            />
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
              {/* <Tippy
                content={
                  <div className="emojiPicker">
                    <Picker onEmojiClick={onEmojiClick} searchPlaceholder="Search Emoji" />
                  </div>
                }
                interactive={true}
                trigger="click"
                delay={0}
                placement="top-end"
                // hideOnClick={false}:
              >
                <div style={{ position: "relative" }}> */}
                  <IconSVG
                    iconName="emoji"
                    nameClass="emoji"
                    fill="#1d9bf0"
                    handleClick={() => setChosenEmoji(!chosenEmoji)}
                  />
                {/* </div>
              </Tippy> */}
              <IconSVG iconName="schedule" fill="#1d9bf0" />
            </div>
            <div className="box-btn">
              <ButtonCoustom
                text="Tweet"
                isDisabled={
                  isEditState.isEditing
                    ? editBody || editImage
                      ? false
                      : true
                    : body || image
                    ? false
                    : true
                }
              />
            </div>
          </div>

          <div className="emojiPicker">
            {chosenEmoji && <Picker onEmojiClick={onEmojiClick} searchPlaceholder="Search Emoji" />}
          </div>
        </form>
      </div>
    </>
  );
};

type PropsLogicalType = { nameClass: string };

const AddNewPostLogical: React.FC<PropsLogicalType> = ({ nameClass }) => {
  const propsContext = useTweet();
  const currentUser = propsContext?.currentUser as IUserProfile;
  const bodyState = propsContext?.bodyState as bodyStateType;
  const emojiState = propsContext?.emojiState as emojiStateType;
  const imageState = propsContext?.imageState as imageStateType;
  const imagePreviewState = propsContext?.imagePreviewState as imagePreviewStateType;
  const isEditState = propsContext?.isEditState as { isEditing: boolean; setIsEditing: () => void };
  const editBodyState = propsContext?.editBodyState as editBodyStateType;
  const editImage = propsContext?.editImage as File | null;
  const onEmojiClick = propsContext?.onEmojiClick as (
    e: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData
  ) => void;
  const handleSubmit = propsContext?.handleSubmit as (e: React.FormEvent<HTMLFormElement>) => void;
  const resetImage = propsContext?.resetImage as () => void;

  return (
    <AddNewPost
      nameClass={nameClass}
      currentUser={currentUser}
      bodyState={bodyState}
      emojiState={emojiState}
      imageState={imageState}
      imagePreviewState={imagePreviewState}
      isEditState={isEditState}
      editBodyState={editBodyState}
      editImage={editImage}
      onEmojiClick={onEmojiClick}
      handleSubmit={handleSubmit}
      resetImage={resetImage}
    />
  );
};

export default AddNewPostLogical;
