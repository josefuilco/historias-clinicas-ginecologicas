export const CIPHERED_SERVICE = Symbol('CIPHERED_SERVICE');

export interface ICipheredService {
  encrypt(value: string): Promise<string>;
  compare(value: string, chipered: string): Promise<string>;
}