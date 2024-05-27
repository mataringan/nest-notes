import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  SoftRemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { AuditLog } from '../../audit-logs/entities/audit-log.entity';
import { User } from "../entities/user.entity";
import { UserAud } from "../entities/user-aud.entity";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    @InjectDataSource()
      dataSource: DataSource
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>) {
    const {
      entity,
      queryRunner: {
        data: { user },
      },
    } = event;
    entity.createdBy = user ? user.name : 'SYSTEM';
    entity.updatedBy = user ? user.name : 'SYSTEM';
    // entity.searchText = this.setSearchText(entity);
  }

  beforeUpdate(event: UpdateEvent<User>) {
    const {
      entity,
      queryRunner: {
        data: { user },
      },
    } = event;
    entity.updatedBy = user ? user.name : 'SYSTEM';
    // entity.searchText = this.setSearchText(entity);
  }

  beforeSoftRemove(event: SoftRemoveEvent<User>): void | Promise<any> {
    const {
      entity,
      queryRunner: {
        data: { user },
      },
    } = event;
    entity.updatedBy = user ? user.name : 'SYSTEM';
    entity.deletedBy = user ? user.name : 'SYSTEM';
  }

  async beforeRemove(event: RemoveEvent<User>) {
    await this.setAudit(event, 0);
  }

  async afterInsert(event: InsertEvent<User>) {
    await this.setAudit(event, 1, 1);
  }

  async afterUpdate(event: UpdateEvent<User>) {
    await this.setAudit(event, 1, 1);

  }

  async afterSoftRemove(event: SoftRemoveEvent<User>) {
    await this.setAudit(event, 1, 1);
  }

  async setAudit(
    event:
      | InsertEvent<User>
      | UpdateEvent<User>
      | SoftRemoveEvent<User>
      | RemoveEvent<User>,
    revType = 1,
    version = 1
  ): Promise<void> {
    const {
      entity,
      queryRunner: {
        data: { user },
      },
      manager,
    } = event;

    // Set audit only if user exists
    if (user) {
      const auditRepository = manager.getRepository(AuditLog);
      const entityRepository = manager.getRepository(UserAud);

      // Create audit log entity
      const auditLog = new AuditLog();
      auditLog.userId = user.id;
      auditLog.revType = revType;
      auditLog.version = version;
      auditLog.createdBy = entity.createdBy;
      auditLog.updatedBy = entity.updatedBy;
      await auditRepository.save(auditLog, { listeners: false });

      // Create audit on entity
      const entityAud = new UserAud();
      entityRepository.merge(entityAud, entity, { audit: auditLog });
      await entityRepository.save(entityAud, { listeners: false });
    }
  }

  // setSearchText(entity) {
  //   const arrayText = [entity.companyCode, entity.linkName, entity.code, entity.type];
  //   return arrayText.join(' ');
  // }
}
