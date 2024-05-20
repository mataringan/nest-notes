import { AppBase } from "../../../common/entities/app-base";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";
import { Exclude } from "class-transformer";


@Entity()
export class User extends AppBase{
  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Exclude()
  @ApiProperty()
  @Column({type: 'varchar', length: 100})
  password: string;

  @ApiProperty()
  @Column({type: 'varchar', length: 100 })
  role: string;
}
