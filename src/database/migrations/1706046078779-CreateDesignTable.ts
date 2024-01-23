import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDesignTable1706046078779 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "designs",
				columns: [
					{
						name: "id",
						type: "int",
						isPrimary: true,
						isGenerated: true,
						generationStrategy: "increment",
					},
                    {
						name: "style",
						type: "varchar",
						length: "255",
						isUnique: true,
					},
					{
						name: "picture",
						type: "varchar",
						length: "255",
						isUnique: true,
					},
					{
						name: "artist_id",
						type: "int",
					},
				],
                foreignKeys: [
                    {
                        columnNames: ["artist_id"],
                        referencedTableName: "artists",
                        referencedColumnNames: ["id"],
                    },
                ]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable("users");
	}
}
