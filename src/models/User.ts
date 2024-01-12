import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
 } from "typeorm";
 import { Role } from "./Role";
 
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
 
    // N:N con Role
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
    roles!: Role[]

    @Column()
    is_admin!: boolean
 }


