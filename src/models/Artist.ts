import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Role } from "./Role";
import { User } from "./User";
import { Design } from "./Design";
import { Appointment } from "./Appointment";

@Entity("artists")
export class Artist {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@OneToOne(() => User, (user) => user.artist)
	@JoinColumn({ name: "user_id" })
	user!: User;

	@OneToMany(() => Appointment, (appointment) => appointment.user)
	appointments?: Appointment[];

	@OneToMany(() => Design, (design) => design.artist)
	design?: Design[];
}
