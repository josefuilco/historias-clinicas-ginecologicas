import jwt from 'jsonwebtoken';
import { envs } from 'src/core/infrastructure/config/env.config';
import { ITokenProvider } from "src/core/domain/providers/token.provider";


export class JwtTokenProvider implements ITokenProvider {
  createToken<T = any>(payload: T): string {
    const token = jwt.sign(JSON.stringify(payload), envs.JWT_SECRET, { expiresIn: '8h' });
    return token;
  }
  
  readToken<T = any>(token: string): T {
    const valueObject = jwt.verify(token, envs.JWT_SECRET);
    if (typeof valueObject === 'string')
      return JSON.parse(valueObject) as T;

    return valueObject as T;
  }
}