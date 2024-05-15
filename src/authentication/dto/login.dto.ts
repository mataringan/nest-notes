import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string
}