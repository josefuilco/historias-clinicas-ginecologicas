import { Inject, Injectable } from "@nestjs/common";
import { ACCOUNT_REPOSITORY, IAccountRepository } from "src/auth/domain/repositories/account.repository";
import { CIPHERED_SERVICE, ICipheredService } from "src/auth/domain/services/ciphered.service";
import { ITokenService, TOKEN_SERVICE } from "src/auth/domain/services/token.service";
import { AccountPayloadDto } from "../dtos/acccountPayload.dto";
import { AccountNotFoundError } from "src/auth/domain/errors/accountNotFound.error";
import { PasswordIncorrectError } from "src/auth/domain/errors/passwordIncorrect.error";

@Injectable()
export class AuthService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: ITokenService,
    @Inject(CIPHERED_SERVICE)
    private readonly cipheredService: ICipheredService
  ) {}

  async authenticateAccount(nickname: string, password: string): Promise<AccountPayloadDto> {
    const accountFound = await this.accountRepository.findAccountByNickname(nickname);
    if (!accountFound)
      throw new AccountNotFoundError();

    const passwordCompared = await this.cipheredService.compare(password, accountFound.password);
    if (!passwordCompared)
      throw new PasswordIncorrectError();

    return {
      accountId: accountFound.id,
      roleId: accountFound.roleId
    };
  }
}