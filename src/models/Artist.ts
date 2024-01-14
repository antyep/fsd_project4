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
import { Appointment } from "./Appointment";

@Entity("artists")
export class Artist {
   @PrimaryGeneratedColumn()
   id?: number;

  @OneToOne(() => User, (user) => user.artist)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToMany(() => Appointment, (appointment) => appointment.artists)
  @JoinTable({
      name: "appointment_artist",
      joinColumn: { name: "artist_id", referencedColumnName: "id" },
      inverseJoinColumn: { name: "appointment_id", referencedColumnName: "id" },
  })
  appointments!: Appointment[];
}

