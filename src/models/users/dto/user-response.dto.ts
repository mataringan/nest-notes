import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: string;
}