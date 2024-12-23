import { Module } from "@nestjs/common";
import { AccountService } from "./application/services/account.service";
import { ApplicationModule } from "./application/application.module";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";

@Module({
  imports: [ApplicationModule, InfrastructureModule]
})
export class AuthModule {}