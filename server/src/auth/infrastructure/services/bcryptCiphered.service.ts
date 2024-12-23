import { ICipheredService } from "src/auth/domain/services/ciphered.service";

export class BcryptCipheredService implements ICipheredService {
  encrypt(value: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  compare(value: string, chipered: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
}