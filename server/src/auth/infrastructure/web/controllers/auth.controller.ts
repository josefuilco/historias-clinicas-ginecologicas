import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { AuthService } from "src/auth/application/services/auth.service";
import { AuthAccountDto } from "../dtos/authAccount.dto";

@Controller('auth')
export class AuthController {
  constructor(
    @Inject()
    private readonly authService: AuthService
  ) {}

  @Post('sign-in')
  async SignIn(@Body() authAccountDto: AuthAccountDto, @Res() response: Response) {
    try {
      const token = await this.authService.getTokenByAuthentication(authAccountDto.username, authAccountDto.password);
      response.headers.set('Authorization', token);
      return { message: 'User authenticated' };
    } catch (error) {
      if (error instanceof Error)
        return { message: error.message };
    }
  }
}