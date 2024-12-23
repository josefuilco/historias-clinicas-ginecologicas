import { Account } from "../models/account.model";
import { User } from "../models/user.model";

export const ACCOUNT_REPOSITORY = Symbol('ACCOUNT_REPOSITORY');

export interface IAccountRepository {
  createAccount(account: Account, user: User): Promise<boolean>;
  findAccountByNickname(nickname: string): Promise<Account>;
  findAccountById(id: number): Promise<Account>;
  updateAccount(account: Account): Promise<boolean>;
  deleteAccount(id: number): Promise<boolean>;
}