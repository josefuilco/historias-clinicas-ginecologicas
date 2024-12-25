import { Module } from "@nestjs/common";
import { AccountService } from "./application/services/account.service";
import { AuthService } from "./application/services/auth.service";
import { TOKEN_PROVIDER } from "./domain/providers/token.provider";
import { JwtTokenProvider } from "./infrastructure/providers/jwtToken.provider";
import { CIPHERED_PROVIDER } from "./domain/providers/ciphered.provider";
import { BcryptCipheredProvider } from "./infrastructure/providers/bcryptCiphered.provider";
import { PersistenceModule } from "./infrastructure/persistence/persistence.module";
import { AuthController } from "./infrastructure/web/controllers/auth.controller";
import { AccountController } from "./infrastructure/web/controllers/account.controller";

@Module({
  imports: [PersistenceModule],
  controllers: [
    AuthController,
    AccountController
  ],
  providers: [
    AccountService,
    AuthService,
    {
      provide: TOKEN_PROVIDER,
      useClass: JwtTokenProvider
    },
    {
      provide: CIPHERED_PROVIDER,
      useClass: BcryptCipheredProvider
    }
  ]
})
export class AuthModule {}