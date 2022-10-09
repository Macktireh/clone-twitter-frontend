import React from "react";

import Picker, { IEmojiData } from "emoji-picker-react";
// import Tippy from "@tippyjs/react";

import IconSVG from "@/widgets/IconSVG";
import ButtonCoustom from "@/widgets/ButtonCustom";
import {
  // bodyStateType,
  // emojiStateType,
  IUserProfile,
  // imagePreviewStateType,
  // imageStateType,
  // editBodyStateType,
} from "@/models";
import { baseURL } from "@/config/axios";
// import { useTweet } from "@/context/TweetProvider";
import { Link } from "react-router-dom";
import { pathLinkProfile } from "@/utils/pathRoute";
import { bodyPostStateType, editBodyPostStateType, emojiPostStateType, imagePostStateType, imagePreviewPostStateType, useTweetComment } from "@/context/TweetCommentProvider";

type propsTypes = {
  nameClass: string;
  currentUser: IUserProfile | null;
  bodyState: bodyPostStateType;
  emojiState: emojiPostStateType;
  imageState: imagePostStateType;
  imagePreviewState: imagePreviewPostStateType;
  isEditState: { isEditingPost: boolean; setIsEditingPost: () => void };
  editBodyState: editBodyPostStateType;
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
  // const { body, setBody } = bodyState;
  // const { chosenEmoji, setChosenEmoji } = emojiState;
  // const { image, handleChangeImage } = imageState;
  // const { editBody, setEditBody } = editBodyState;
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  const textareaAutoSize = (el: HTMLElement) => {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  React.useEffect(() => {
    const textarea = document.getElementById(nameClass);
    if (textarea) {
      textarea.addEventListener("input", () => textareaAutoSize(textarea));
      textarea.addEventListener("focus", () => textareaAutoSize(textarea));
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
              value={isEditState.isEditingPost ? editBodyState.editBodyPost : bodyState.bodyPost}
              onChange={(e) =>
                isEditState.isEditingPost ? editBodyState.setEditBodyPost(e.target.value) : bodyState.setBodyPost(e.target.value)
              }
            />
            {imagePreviewState.imagePreviewPost && (
              <div className="img-preview-container">
                <img src={imagePreviewState.imagePreviewPost} alt="imagePostPreview" />
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
                  onChange={(e) => imageState.handleChangeImagePost(e)}
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
                handleClick={() => emojiState.setChosenEmojiPost(!emojiState.chosenEmojiPost)}
              />
              {/* </div>
              </Tippy> */}
              <IconSVG iconName="schedule" fill="#1d9bf0" />
            </div>
            <div className="box-btn">
              <ButtonCoustom
                text="Tweet"
                isDisabled={
                  isEditState.isEditingPost
                    ? editBodyState.editBodyPost || editImage
                      ? false
                      : true
                    : bodyState.bodyPost || imageState.imagePost
                    ? false
                    : true
                }
              />
            </div>
          </div>

          <div className="emojiPicker">
            {emojiState.chosenEmojiPost && <Picker onEmojiClick={onEmojiClick} searchPlaceholder="Search Emoji" />}
          </div>
        </form>
      </div>
    </>
  );
};

type PropsLogicalType = { nameClass: string };

const AddNewPostLogical: React.FC<PropsLogicalType> = ({ nameClass }) => {
  const propsContext = useTweetComment();
  const currentUser = propsContext?.currentUser as IUserProfile;
  const bodyState = propsContext?.bodyPostState as bodyPostStateType;
  const emojiState = propsContext?.emojiPostState as emojiPostStateType;
  const imageState = propsContext?.imagePostState as imagePostStateType;
  const imagePreviewState = propsContext?.imagePreviewPostState as imagePreviewPostStateType;
  const isEditState = propsContext?.isEditPostState as { isEditingPost: boolean; setIsEditingPost: () => void };
  const editBodyState = propsContext?.editBodyPostState as editBodyPostStateType;
  const editImage = propsContext?.editImagePost as File | null;
  const onEmojiClick = propsContext?.onEmojiClickPost as (
    e: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData
  ) => void;
  const handleSubmit = propsContext?.handleSubmitPost as (e: React.FormEvent<HTMLFormElement>) => void;
  const resetImage = propsContext?.resetImagePost as () => void;

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
