import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
} from "typeorm";
import { Artist } from "./Artist";

@Entity("Design")
export class Design extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    style!: string;

    @Column()
    picture!: string;

    @Column({ name: "created_at" })
    createdAt!: Date;

    @Column({ name: "updated_at" })
    updatedAt!: Date;

    @ManyToOne(() => Artist, { nullable: false })
    @JoinColumn({ name: "artist_id" })
    artist!: Artist;

    @Column({ name: "artist_id" })
    artistId!: number;
}
