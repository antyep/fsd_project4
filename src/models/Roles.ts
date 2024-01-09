import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
}   from "typeorm";
import { User } from "./Users";

@Entity("roles");
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: "string";

    @Column()
    createdAt!: Date;

    @Column()
    updatedAt!: Date;

    @ManyToMany((User, (user) => user.roles)
    @JoinTable({
        name: "users_roles",
        joinColumn: {
            name: "role_id",
            referencedColumName: "id",
        },
        inverseJoinColumn: {
            name: "user_id",
            referencedColumName: "id",
        },
    })
    users?: User[];
}
