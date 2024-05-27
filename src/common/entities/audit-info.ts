import { ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { AuditLog } from "../../models/audit-logs/entities/audit-log.entity";


export class AuditInfo {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string

  @ManyToOne(() => AuditLog, audit => audit.id)
  @JoinColumn({name: 'id'})
  log: AuditLog
}