import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimgaryGeneratedColumn,
}   from "typeorm";
import { User } from "./Users";

@Entity("roles");
export class Role {
    @PrimgaryGeneratedColumn()
    id!: number;

    @Column()
    name: "string";

    @Column()
    createdAt!: Date;
}
