import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCustomersTable1705161525431 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "customers",
				columns: [
					{
						name: "id",
						type: "int",
						isPrimary: true,
						isGenerated: true,
						generationStrategy: "increment",
					},
					{
						name: "user_id",
						type: "int",
						isPrimary: true,
					},
				],
				foreignKeys: [
					{
						columnNames: ["user_id"],
						referencedTableName: "users",
						referencedColumnNames: ["id"],
					},
				],
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("customers");
	}
}
