import { Account } from "../models/account.model";

export const ACCOUNT_REPOSITORY = Symbol('ACCOUNT_REPOSITORY');

export interface IAccountRepository {
  createAccount(nickname: string, password: string): Promise<boolean>;
  findAccountByNickname(nickname: string): Promise<Account>;
  findAccountById(id: string): Promise<Account>;
  updateAccount(account: Account): Promise<Account>;
}