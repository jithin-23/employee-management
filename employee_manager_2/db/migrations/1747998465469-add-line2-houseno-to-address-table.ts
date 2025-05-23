import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLine2HousenoToAddressTable1747998465469 implements MigrationInterface {
    name = 'AddLine2HousenoToAddressTable1747998465469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying`);
        await queryRunner.query(`ALTER TABLE "address" ADD "house_no" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "house_no"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
    }

}
