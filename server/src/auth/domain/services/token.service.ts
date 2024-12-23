export const TOKEN_SERVICE = Symbol('TOKEN_SERVICE');

export interface ITokenService {
  createToken(payload: any): string;
  readToken(token: string): any;
}