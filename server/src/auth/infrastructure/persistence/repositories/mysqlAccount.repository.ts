import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Account } from "src/auth/domain/models/account.model";
import { IAccountRepository } from "src/auth/domain/repositories/account.repository";
import { AccountEntity } from "../entities/account.entity";
import { Role } from "src/auth/domain/enums/role.enum";

@Injectable()
export class MysqlAccountRepository implements IAccountRepository {
  constructor(
    @InjectModel(AccountEntity)
    private readonly accountEntity: typeof AccountEntity
  ) {}
  
  async createAccount(nickname: string, password: string): Promise<boolean> {
    const account = await this.accountEntity.create({
      nickname,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
      roleId: Role.User
    });

    return Boolean(account);
  }

  async findAccountByNickname(nickname: string): Promise<Account> {
    const accountFound = await this.accountEntity.findOne({ where: { nickname } });
    const account: Account = {
      id: accountFound.id,
      nickname: accountFound.nickname,
      password: accountFound.password,
      createdAt: accountFound.createdAt,
      updatedAt: accountFound.updatedAt,
      roleId: accountFound.roleId
    };

    return account;
  }
  
  async findAccountById(id: string): Promise<Account> {
    const accountFound = await this.accountEntity.findOne({ where: { id } });
    const account: Account = {
      id: accountFound.id,
      nickname: accountFound.nickname,
      password: accountFound.password,
      createdAt: accountFound.createdAt,
      updatedAt: accountFound.updatedAt,
      roleId: accountFound.roleId
    };

    return account;
  }

  updateAccount(account: Account): Promise<Account> {
    throw new Error("Method not implemented.");
  }
}