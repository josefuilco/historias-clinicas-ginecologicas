import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Account } from "src/auth/domain/models/account.model";
import { IAccountRepository } from "src/auth/domain/repositories/account.repository";
import { AccountEntity } from "../entities/account.entity";
import { Role } from "src/auth/domain/enums/role.enum";
import { User } from "src/auth/domain/models/user.model";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class MysqlAccountRepository implements IAccountRepository {
  constructor(
    @InjectModel(AccountEntity)
    private readonly accountEntity: typeof AccountEntity,
    @InjectModel(UserEntity)
    private readonly userEntity: typeof UserEntity
  ) {}
  
  async createAccount(account: Account, user: User): Promise<boolean> {
    const userCreated = await this.userEntity.create({
      names: user.names,
      lastNames: user.lastNames,
      email: user.email,
      cellphone: user.cellphone
    });

    const accountCreated = await this.accountEntity.create({
      nickname: `${userCreated.names.split(' ')[0].toLowerCase()}@${userCreated.lastNames.split(' ')[0].toLowerCase()}`,
      password: account.password,
      userId: userCreated.id
    });

    return accountCreated !== undefined;
  }

  async findAccountByNickname(nickname: string): Promise<Account> {
    const accountFound = await this.accountEntity.findOne({ where: { nickname, isActive: true } });
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
  
  async findAccountById(id: number): Promise<Account> {
    const accountFound = await this.accountEntity.findOne({ where: { id, isActive: true } });
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

  async updateAccount(account: Account): Promise<boolean> {
    const [ rowAffected ] = await this.accountEntity.update({
      password: account.password
    }, {
      where: { id: account.id }
    });

    return rowAffected > 0;
  }

  async deleteAccount(id: number): Promise<boolean> {
    const [ rowAffected ] = await this.accountEntity.update({
      isActive: false
    }, {
      where: { id }
    });

    return rowAffected > 0;
  }
}