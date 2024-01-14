import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    OneToOne,
    ManyToMany,
    PrimaryGeneratedColumn,
    JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Artist } from "./Artist";

@Entity("appointments")
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    date!: string;

    @Column()
    hour!: string;

    @Column({ name: "created_at" })
    createdAt!: Date;

    @Column({ name: "updated_at" })
    updatedAt!: Date;

    @ManyToMany(() => Artist, (artist) => artist.appointments)
    @JoinTable({
        name: "appointment_artist",
        joinColumn: { name: "appointment_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "artist_id", referencedColumnName: "id" },
    })
    artists!: Artist[];

    @OneToOne(() => User, (user) => user.appointment)
    @JoinColumn({ name: "user_id" })
    user!: User;
}
