export const TOKEN_PROVIDER = Symbol('TOKEN_SERVICE');

export interface ITokenProvider {
  createToken<T = any>(payload: T): string;
  readToken<T = any>(token: string): T;
}