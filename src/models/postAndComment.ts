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
  numberComments: number;
}

export interface IComment {
  publicId: string;
  postPublicIdRead: string;
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
export type editBodyStateType = { editBody: string; setEditBody: (value: string) => void };
export type imagePreviewStateType = { imagePreview: string; setImagePreview: (value: string) => void };
export type commentImageStateType = {
  commentImage: File | null;
  handleChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export type commentImagePreviewStateType = { commentImagePreview: string; setcommentImagePreview: (value: string) => void };
