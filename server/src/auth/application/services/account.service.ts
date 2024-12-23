import { Inject, Injectable } from "@nestjs/common";
import { ACCOUNT_REPOSITORY, IAccountRepository } from "src/auth/domain/repositories/account.repository";
import { AccountInformationDto } from "../dtos/accountInformation.dto";
import { Account } from "src/auth/domain/models/account.model";
import { User } from "src/auth/domain/models/user.model";
import { AccountNotCreatedError } from "src/auth/domain/errors/accountNotCreated.error";
import { AccountNotUpdatedError } from "src/auth/domain/errors/accountNotUpdated.error";
import { AccountNotFoundError } from "src/auth/domain/errors/accountNotFound.error";
import { Role } from "src/auth/domain/enums/role.enum";
import { AccountNotDeletedError } from "src/auth/domain/errors/accountNotDeleted.error";
import { CIPHERED_SERVICE, ICipheredService } from "src/auth/domain/services/ciphered.service";
import { PasswordIncorrectError } from "src/auth/domain/errors/passwordIncorrect.error";

@Injectable()
export class AccountService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
    @Inject(CIPHERED_SERVICE)
    private readonly cipheredService: ICipheredService
  ) {}

  async createAccount(account: Account, user: User): Promise<void> {
    account.password = await this.cipheredService.encrypt(account.password);
    const isCreated = await this.accountRepository.createAccount(account, user);
    if (!isCreated)
      throw new AccountNotCreatedError();
  }

  async updateAccount(account: Account, oldPassword: string): Promise<void> {
    const accountFound = await this.accountRepository.findAccountById(account.id);
    if (!accountFound)
      throw new AccountNotFoundError();

    const passwordAreEquals = await this.cipheredService.compare(oldPassword, accountFound.password);
    if (!passwordAreEquals)
      throw new PasswordIncorrectError();

    accountFound.password = await this.cipheredService.encrypt(account.password);
    const isUpdated = await this.accountRepository.updateAccount(accountFound);
    if (!isUpdated)
      throw new AccountNotUpdatedError();
  }

  async searchAccountById(accountId: number): Promise<AccountInformationDto> {
    const accountFound = await this.accountRepository.findAccountById(accountId);
    if (!accountFound)
      throw new AccountNotFoundError();
    return {
      fullname: `${accountFound.user.names} ${accountFound.user.lastNames}`,
      role: accountFound.roleId === Role.Admin ? 'Admin' : 'User',
      cellphone: accountFound.user.cellphone,
      email: accountFound.user.email
    };
  }

  async deleteAccount(accountId: number): Promise<void> {
    const isDeleted = await this.accountRepository.deleteAccount(accountId);
    if (!isDeleted)
      throw new AccountNotDeletedError();
  }
}