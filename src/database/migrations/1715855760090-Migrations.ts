import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migrations1715855760090 implements MigrationInterface {
    name = ' Migrations1715855760090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying(100) NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    }
}

