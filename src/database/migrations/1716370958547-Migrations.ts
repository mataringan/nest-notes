import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migrations1716370958547 implements MigrationInterface {
    name = ' Migrations1716370958547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying(255), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying, "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by" character varying, "deleted_by_id" uuid, "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "role" character varying(100) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "audit"."audit_log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying(255) NOT NULL, "updated_by" character varying(255) NOT NULL, "version" integer NOT NULL, "user_id" uuid NOT NULL, "rev_type" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_07fefa57f7f5ab8fc3f52b3ed0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "audit"."user_aud" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying(255), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by" character varying, "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by" character varying, "deleted_by_id" uuid, "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "role" character varying(100) NOT NULL, "audit_id" uuid NOT NULL, CONSTRAINT "PK_a57146eb69c9d239dac357c3dcf" PRIMARY KEY ("id", "audit_id"))`);
        await queryRunner.query(`ALTER TABLE "audit"."audit_log" ADD CONSTRAINT "FK_cb11bd5b662431ea0ac455a27d7" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "audit"."user_aud" ADD CONSTRAINT "FK_cda94642e70e695e219a60c72ce" FOREIGN KEY ("audit_id") REFERENCES "audit"."audit_log"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "audit"."user_aud" DROP CONSTRAINT "FK_cda94642e70e695e219a60c72ce"`);
        await queryRunner.query(`ALTER TABLE "audit"."audit_log" DROP CONSTRAINT "FK_cb11bd5b662431ea0ac455a27d7"`);
        await queryRunner.query(`DROP TABLE "audit"."user_aud"`);
        await queryRunner.query(`DROP TABLE "audit"."audit_log"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
