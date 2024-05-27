import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/entities/user.entity";

@Entity({ schema: 'audit' })
export class AuditLog {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  createdBy: string

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  updatedBy: string

  @ApiProperty()
  @VersionColumn()
  version: number

  @ApiProperty()
  @Column({ type: 'uuid' })
  userId: string

  @ApiProperty()
  @Column({ type: 'int', default: 1 })
  revType: number // 0: entity removed, 1: entity exists

  @ManyToOne(()=> User, user => user.id)
  @JoinColumn({name: 'user_id'})
  user: User

}