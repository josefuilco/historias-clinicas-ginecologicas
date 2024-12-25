import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  names: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(36)
  lastNames: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @IsString()
  @Matches(/^\d{9}/)
  cellphone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(18)
  password: string;
}