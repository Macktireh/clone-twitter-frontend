import React from "react";

import Picker, { IEmojiData } from "emoji-picker-react";

import IconSVG from "@/components/widgets/IconSVG";
import ButtonCoustom from "@/components/widgets/ButtonCustom";
import { IAuthUserProfile } from "@/models";
import { baseURL } from "@/api";

type TcurrentUser = { currentUser: IAuthUserProfile | null };

const AddNewPost: React.FC<TcurrentUser> = ({ currentUser }) => {
  const [textareaValue, setTextareaValue] = React.useState("");
  const [chosenEmoji, setChosenEmoji] = React.useState(false);

  React.useEffect(() => {
    const textarea = document.querySelector("textarea");
    textarea?.addEventListener("input", (e) => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    });
  });

  const onEmojiClick = (e: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
    setTextareaValue((value) => value + emojiObject.emoji);
    setChosenEmoji(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(textareaValue);
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
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="textarea">
          <textarea
            placeholder="What's happening?"
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
        </div>
        <div className="form-btn">
          <div className="input-icon">
            <label htmlFor="file" className="form-lable">
              <input type="file" name="img" id="file" className="form-input-file" hidden />
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
          <div className="box-btn" onClick={(e) => {}}>
            <ButtonCoustom text="Tweet" isDisabled={textareaValue ? false : true} />
          </div>
        </div>
        <div className="emojiPicker">
          {chosenEmoji && <Picker onEmojiClick={onEmojiClick} searchPlaceholder="Search Emoji" />}
        </div>
      </form>
    </div>
  );
};

export default AddNewPost;
