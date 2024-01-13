import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("roles")
export class Role {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@ManyToMany(() => User, (user: User) => user.roles)
	users?: User[];
}
