import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAppointmentTable1706045863023 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "appointments",
				columns: [
					{
						name: "id",
						type: "int",
						isPrimary: true,
						isGenerated: true,
						generationStrategy: "increment",
					},
					{
						name: "date",
						type: "varchar",
						length: "255",
					},
                    {
                        name: "user_id",
                        type: "int",
                        length: "255",
                    },
                    {
                        name: "artist_id",
                        type: "int",
                        length: "255",
                    }
				],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                    },
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
