import React from "react";

import Picker, { IEmojiData } from "emoji-picker-react";

import IconSVG from "@/widgets/IconSVG";
import ButtonCoustom from "@/widgets/ButtonCustom";
import {
  // bodyStateType,
  // emojiStateType,
  IUserProfile,
  // editBodyStateType,
  // commentImageStateType,
} from "@/models";
import { Link } from "react-router-dom";
import { pathLinkProfile } from "@/utils/pathRoute";
// import { useComment } from "@/context/CommentProvider";
// import { commentImagePreviewStateType } from "../../models/postAndComment";
import {
  bodyCommentStateType,
  editBodyCommentStateType,
  emojiCommentStateType,
  imageCommentStateType,
  imagePreviewCommentStateType,
  useTweetComment,
} from "@/context/TweetCommentProvider";

type propsTypes = {
  nameClass: string;
  postPublicId?: string;
  currentUser: IUserProfile | null;
  bodyState: bodyCommentStateType;
  emojiState: emojiCommentStateType;
  imageState: imageCommentStateType;
  imagePreviewState: imagePreviewCommentStateType;
  isEditState: { isEditingComment: boolean; setIsEditingComment: () => void };
  editBodyState: editBodyCommentStateType;
  editImage: File | null;
  onEmojiClick: (e: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetImage: () => void;
};

const AddNewComment: React.FC<propsTypes> = ({
  nameClass,
  postPublicId,
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
  // const { commentImage, handleChangeImage } = imageState;
  // const { editBody, setEditBody } = editBodyState;
  const imageInputRefComment = React.useRef<HTMLInputElement>(null);

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
    if (imageInputRefComment.current) imageInputRefComment.current.value = "";
  };

  return (
    <div className="AddNewPost">
      <div className="box-img">
        <Link to={pathLinkProfile(currentUser?.pseudo as string)}>
          <img src={currentUser?.profilePicture as string} alt="" />
        </Link>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="textarea-image">
          <textarea
            id={nameClass}
            placeholder="Tweet your reply"
            value={isEditState.isEditingComment ? editBodyState.editBodyComment : bodyState.bodyComment}
            onChange={(e) =>
              isEditState.isEditingComment
                ? editBodyState.setEditBodyComment(e.target.value)
                : bodyState.setBodyComment(e.target.value)
            }
          />
          {imagePreviewState.imagePreviewComment && (
            <div className="img-preview-container">
              <img src={imagePreviewState.imagePreviewComment} alt="imagePostPreview" />
              <div className="close" onClick={() => resetImage()}>
                <img src="/static/svg/close.svg" alt="" />
              </div>
            </div>
          )}
        </div>
        <div className="form-btn">
          <div className="input-icon">
            <label htmlFor="file-comment" className="form-lable">
              <input
                type="file"
                name="img-comment"
                id="file-comment"
                className="form-input-file"
                hidden
                onChange={(e) => imageState.handleChangeImageComment(e)}
                onClick={resetInputFile}
                ref={imageInputRefComment}
              />
              <IconSVG iconName="add-post-img" fill="#1d9bf0" />
            </label>
            <IconSVG iconName="gif" fill="#1d9bf0" />
            <IconSVG iconName="pol" fill="#1d9bf0" />
            <IconSVG
              iconName="emoji"
              nameClass="emoji"
              fill="#1d9bf0"
              handleClick={() => emojiState.setChosenEmojiComment(!emojiState.chosenEmojiComment)}
            />
            <IconSVG iconName="schedule" fill="#1d9bf0" />
          </div>
          <div className="box-btn">
            <ButtonCoustom
              text="Reply"
              isDisabled={
                isEditState.isEditingComment
                  ? editBodyState.editBodyComment || editImage
                    ? false
                    : true
                  : bodyState.bodyComment || imageState.imageComment
                  ? false
                  : true
              }
            />
          </div>
        </div>
        <div className="emojiPicker">
          {emojiState.chosenEmojiComment && (
            <Picker onEmojiClick={onEmojiClick} searchPlaceholder="Search Emoji" />
          )}
        </div>
      </form>
    </div>
  );
};

type PropsLogicalType = { nameClass: string };

const AddNewCommentLogical: React.FC<PropsLogicalType> = ({ nameClass }) => {
  const propsContext = useTweetComment();
  const currentUser = propsContext?.currentUser as IUserProfile;
  const bodyState = propsContext?.bodyCommentState as bodyCommentStateType;
  const emojiState = propsContext?.emojiCommentState as emojiCommentStateType;
  const imageState = propsContext?.imageCommentState as imageCommentStateType;
  const imagePreviewState = propsContext?.imagePreviewCommentState as imagePreviewCommentStateType;
  const isEditState = propsContext?.isEditCommentState as {
    isEditingComment: boolean;
    setIsEditingComment: () => void;
  };
  const editBodyState = propsContext?.editBodyCommentState as editBodyCommentStateType;
  const editImage = propsContext?.editImageComment as File | null;
  const onEmojiClick = propsContext?.onEmojiClickComment as (
    e: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData
  ) => void;
  const handleSubmit = propsContext?.handleSubmitComment as (e: React.FormEvent<HTMLFormElement>) => void;
  const resetImage = propsContext?.resetImageComment as () => void;

  return (
    <AddNewComment
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

export default AddNewCommentLogical;
