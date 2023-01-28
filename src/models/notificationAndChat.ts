import { IUser } from '@/models/userProfile';
export interface INotif {
  publicId: string;
  typeNotif: string;
  fromId: string;
  toId: string;
  postPublicId: string;
  post?: string;
  comment?: string;
  seen: boolean;
  read: boolean;
  created: Date;
  updated: Date;
}


export interface IMessage {
  sender: IUser,
  reciever: IUser,
  message: string,
  seen: boolean,
  preview: boolean,
  created: Date,
  updated: Date
}