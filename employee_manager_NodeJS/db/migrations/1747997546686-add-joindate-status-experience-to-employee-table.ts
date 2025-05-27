import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJoindateStatusExperienceToEmployeeTable1747997546686 implements MigrationInterface {
    name = 'AddJoindateStatusExperienceToEmployeeTable1747997546686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "date_of_joining" TIMESTAMP `);
        await queryRunner.query(`UPDATE "employee" SET "date_of_joining" = '01-01-2003' WHERE "date_of_joining" IS NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "date_of_joining" SET NOT NULL`);


        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer`);
        await queryRunner.query(`UPDATE "employee" SET "experience" = '0' WHERE "experience" IS NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" SET NOT NULL`);

        await queryRunner.query(`CREATE TYPE "public"."employee_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'PROBATION')`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" "public"."employee_status_enum" NOT NULL DEFAULT 'ACTIVE'`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."employee_status_enum"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "date_of_joining"`);
    }

}
