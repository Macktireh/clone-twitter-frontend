import { IUser } from '@/models/userProfile';


export interface IFollow {
  user: IUser;
  created:   Date;
  updated:   Date;
}