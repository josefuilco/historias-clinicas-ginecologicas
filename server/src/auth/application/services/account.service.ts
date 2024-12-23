import { Inject, Injectable } from "@nestjs/common";
import { ACCOUNT_REPOSITORY, IAccountRepository } from "src/auth/domain/repositories/account.repository";

@Injectable()
export class AccountService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository
  ) {}
}