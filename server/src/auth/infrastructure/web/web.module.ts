import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AccountController } from "./controllers/account.controller";
import { AuthGuard } from "./guards/auth.guard";

@Module({
  controllers: [AuthController, AccountController],
  providers: [AuthGuard]
})
export class WebModule {}