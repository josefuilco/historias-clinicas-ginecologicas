import { ICipheredProvider } from 'src/auth/domain/providers/ciphered.provider';
import bcrypt from 'bcrypt';

export class BcryptCipheredProvider implements ICipheredProvider {
  async encrypt(value: string): Promise<string> {
    const hashed = await bcrypt.hash(value, 10);
    return hashed;
  }

  async compare(value: string, chipered: string): Promise<boolean> {
    const areEquals = await bcrypt.compare(value, chipered);
    return areEquals;
  }
}