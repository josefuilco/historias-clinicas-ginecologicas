import { Module } from "@nestjs/common";
import { PersistenceModule } from "./persistence/persistence.module";
import { TOKEN_SERVICE } from "../domain/services/token.service";
import { JwtTokenService } from "./services/jwtToken.service";
import { CIPHERED_SERVICE } from "../domain/services/ciphered.service";
import { BcryptCipheredService } from "./services/bcryptCiphered.service";
import { WebModule } from "./web/web.module";

@Module({
  imports: [PersistenceModule, WebModule],
  providers: [
    {
      provide: TOKEN_SERVICE,
      useClass: JwtTokenService
    },
    {
      provide: CIPHERED_SERVICE,
      useClass: BcryptCipheredService
    }
  ]
})
export class InfrastructureModule {}