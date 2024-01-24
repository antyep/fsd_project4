import {
	BaseEntity,
	Column,
	Entity,
	JoinTable,
	OneToOne,
	ManyToMany,
	PrimaryGeneratedColumn,
	JoinColumn,
	ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Artist } from "./Artist";

@Entity("appointments")
export class Appointment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	date?: Date;

	@ManyToOne(() => Artist, (artist) => artist.appointments)
	@JoinColumn({ name: "artist_id" })
	artist?: Artist;

	@ManyToOne(() => User, (user) => user.appointments)
	@JoinColumn({ name: "user_id" })
	user?: User;
}
