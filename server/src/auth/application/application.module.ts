import { Module } from "@nestjs/common";
import { AccountService } from "./services/account.service";
import { AuthService } from "./services/auth.service";

@Module({
  providers: [
    AccountService,
    AuthService
  ],
  exports: [
    AccountService,
    AuthService
  ]
})
export class ApplicationModule {}