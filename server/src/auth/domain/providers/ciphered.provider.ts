export const CIPHERED_PROVIDER = Symbol('CIPHERED_SERVICE');

export interface ICipheredProvider {
  encrypt(value: string): Promise<string>;
  compare(value: string, chipered: string): Promise<boolean>;
}