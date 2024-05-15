import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    minimum: 0,
    maximum: 10000,
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    format: 'int32',
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10000)
  public page?: number = 1;

  @ApiProperty({
    minimum: 10,
    maximum: 100,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(10)
  @Max(100)
  public limit?: number = 10;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional()
  sortBy: string[];

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  search: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ default: false })
  @Transform(({ value }) => value === 'true' || value === true)
  paginateDisable: boolean;

  static _OPENAPI_METADATA_FACTORY() {
    return {
      sortBy: { type: () => [String] },
    };
  }
}
