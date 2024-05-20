import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class FilterUserDto{
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  role?: string
}