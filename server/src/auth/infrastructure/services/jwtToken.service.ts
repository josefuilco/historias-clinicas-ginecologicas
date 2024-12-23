import { ITokenService } from "src/auth/domain/services/token.service";

export class JwtTokenService implements ITokenService {
  createToken(payload: any): string {
    throw new Error("Method not implemented.");
  }
  readToken(token: string) {
    throw new Error("Method not implemented.");
  }
}