import { Module } from "@nestjs/common";
import { PersistenceModule } from "./infrastructure/persistence/persistence.module";
import { AccountService } from "./application/services/account.service";

@Module({
  imports: [PersistenceModule],
  controllers: [],
  providers: [
    AccountService
  ]
})
export class AuthModule {}