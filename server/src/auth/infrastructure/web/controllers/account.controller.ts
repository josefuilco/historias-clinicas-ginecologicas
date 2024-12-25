import { Body, Controller, Get, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { AccountService } from "src/auth/application/services/account.service";
import { CreateAccountDto } from "../dtos/createAccount.dto";
import { Account } from "src/auth/domain/models/account.model";
import { User } from "src/auth/domain/models/user.model";
import { AuthGuard } from "../../../../core/infrastructure/web/guards/auth.guard";
import { AccountRequest } from "../../../../core/infrastructure/web/requests/account.request";

@Controller('accounts')
export class AccountController {
  constructor(
    @Inject()
    private readonly accountService: AccountService
  ) {}

  @Post()
  async createAccount(@Body() createAccountDto: CreateAccountDto) {
    try {
      const account = new Account();
      account.password = createAccountDto.password;

      const user = new User();
      user.names = createAccountDto.names;
      user.lastNames = createAccountDto.lastNames;
      user.cellphone = createAccountDto.cellphone;
      user.email = createAccountDto.email; 

      await this.accountService.createAccount(account, user);
      return { message: 'Cuenta creada con exito.' };
    } catch (err) {
      if (err instanceof Error)
        return { message: err.message };
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async searchAccountById(@Req() request: AccountRequest) {
    try {
      const account = await this.accountService.searchAccountById(request.accountId);
      return {
        message: 'User Found',
        data: account
      }
    } catch (err) {
      if (err instanceof Error)
        return { message: err.message };
    }
  }
}