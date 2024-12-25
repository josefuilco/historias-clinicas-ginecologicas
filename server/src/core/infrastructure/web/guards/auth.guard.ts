import { CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { Observable } from "rxjs";
import { AccountRequest } from "../requests/account.request";
import { ITokenProvider, TOKEN_PROVIDER } from "src/core/domain/providers/token.provider";

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TOKEN_PROVIDER)
    private readonly tokenProvider: ITokenProvider
  ) {}
  
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: AccountRequest = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.get('Authorization');
    if (!authorizationHeader)
      return false;

    try {
      const tokenExtracted = this.tokenProvider.readToken(authorizationHeader);
      request.accountId = tokenExtracted.accountId;
      request.roleId = tokenExtracted.roleId;
      return true;
    } catch (error) {
      if (error instanceof Error)
        console.error(`${request.headers.get('Origin')} Token Invalid: `, error.message);
      return false;
    }
  }
}