import { IsNotEmpty, IsString } from "class-validator";

export class AuthAccountDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}