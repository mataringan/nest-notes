import { Column, Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { AuditInfo } from "../../../common/entities/audit-info";
import { User } from "./user.entity";

@Entity({ schema: 'audit' })
export class UserAud extends User {
  @ApiProperty()
  @Column(() => AuditInfo)
  audit: AuditInfo
}