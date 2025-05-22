import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEmployee1747817660022 implements MigrationInterface {
    name = 'UpdateEmployee1747817660022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
    }

}
