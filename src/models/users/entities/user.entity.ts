import { AppBase } from "../../../common/entities/app-base";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";

@Entity()
export class User extends AppBase{
  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  email: string;

  @ApiProperty()
  @Column({type: 'varchar', length: 100 })
  password: string;
}
