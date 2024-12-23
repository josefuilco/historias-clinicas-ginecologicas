import { User } from "./user.model";

export class Account {
  id: number;
  nickname: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  // Foreign Keys
  roleId?: number;
  userId?: number;
  // References
  user?: User;
}