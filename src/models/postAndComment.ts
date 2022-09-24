import { IUser } from "@/models/userProfile";

export interface IPost {
  publicId: string;
  authorDetail: IUser;
  body: string;
  image: string;
  is_updated: boolean;
  created: Date;
  updated: Date;
  liked: IUser[];
  comments: IComment[];
}

export interface IComment {
  commentPublicId: string;
  authorDetail: IUser;
  message: string;
  image: string;
  is_updated: boolean;
  created: Date;
  updated: Date;
  liked: IUser[];
}

export type bodyStateType = { body: string; setBody: (value: string) => void };
export type emojiStateType = { chosenEmoji: boolean; setChosenEmoji: (value: boolean) => void };
export type imageStateType = {
  image: File | null;
  handleChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export type imagePreviewStateType = { imagePreview: string; setImagePreview: (value: string) => void };
