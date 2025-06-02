import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmployeeIdToEmployeeTable1748862235120 implements MigrationInterface {
    name = 'AddEmployeeIdToEmployeeTable1748862235120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_id" character varying`);
        await queryRunner.query(`UPDATE "employee" SET "employee_id" = id WHERE "employee_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "employee_id" SET NOT NULL`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_id"`);
    }

}
