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