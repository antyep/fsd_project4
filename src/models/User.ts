import {
	BaseEntity,
	Column,
	Entity,
	JoinTable,
	OneToOne,
	ManyToMany,
	PrimaryGeneratedColumn,
	OneToMany,
	JoinColumn,
} from "typeorm";
import { Role } from "./Role";
import { Artist } from "./Artist";
import { Appointment } from "./Appointment";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ unique: true })
	username!: string;

	@Column()
	password_hash!: string;

	@Column({ unique: true })
	email!: string;

	@ManyToMany(() => Role, (role) => role.users)
	@JoinTable({
		name: "users_roles",
		joinColumn: {
			name: "user_id",
			referencedColumnName: "id",
		},
		inverseJoinColumn: {
			name: "role_id",
			referencedColumnName: "id",
		},
	})
	roles!: Role[];

	@OneToOne(() => Artist, (artist) => artist.user)
	artist?: Artist;

	@OneToMany(() => Appointment, (appointment) => appointment.user)
	appointments?: Appointment[];
}
