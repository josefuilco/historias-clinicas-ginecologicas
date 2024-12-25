import { Inject, Injectable } from "@nestjs/common";
import { ACCOUNT_REPOSITORY, IAccountRepository } from "src/auth/domain/repositories/account.repository";
import { CIPHERED_PROVIDER, ICipheredProvider } from "src/auth/domain/providers/ciphered.provider";
import { ITokenProvider, TOKEN_PROVIDER } from "src/core/domain/providers/token.provider";
import { AccountPayloadDto } from "../dtos/acccountPayload.dto";
import { AccountNotFoundError } from "src/auth/domain/errors/accountNotFound.error";
import { PasswordIncorrectError } from "src/auth/domain/errors/passwordIncorrect.error";

@Injectable()
export class AuthService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly accountRepository: IAccountRepository,
    @Inject(TOKEN_PROVIDER)
    private readonly tokenProvider: ITokenProvider,
    @Inject(CIPHERED_PROVIDER)
    private readonly cipheredProvider: ICipheredProvider
  ) {}

  async getTokenByAuthentication(nickname: string, password: string): Promise<string> {
    const accountFound = await this.accountRepository.findAccountByNickname(nickname);
    if (!accountFound)
      throw new AccountNotFoundError();

    const passwordCompared = await this.cipheredProvider.compare(password, accountFound.password);
    if (!passwordCompared)
      throw new PasswordIncorrectError();

    const accountToken = this.tokenProvider.createToken<AccountPayloadDto>({
      accountId: accountFound.id,
      roleId: accountFound.roleId
    });
    return accountToken;
  }
}