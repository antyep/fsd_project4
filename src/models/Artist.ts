import {
	BaseEntity,
	Column,
	Entity,
	JoinTable,
	JoinColumn,
	OneToOne,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { User } from "./User";
import { Design } from "./Design";
import { Appointment } from "./Appointment";

@Entity("artists")
export class Artist {
	@PrimaryGeneratedColumn()
	id?: number;

	@OneToOne(() => User, (user) => user.artist)
	@JoinColumn({ name: "user_id" })
	user!: User;

	@Column()
	name!: string;

	@ManyToMany(() => Appointment, (appointment) => appointment.artists)
	@JoinTable({
		name: "appointment_artist",
		joinColumn: { name: "artist_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "appointment_id", referencedColumnName: "id" },
	})
	appointments!: Appointment[];

	// Relation so that Artist have many designs linked
	@ManyToMany(() => Design, (design) => design.artist)
	design?: Design[];
}
