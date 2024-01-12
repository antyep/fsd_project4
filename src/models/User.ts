import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    OneToOne,
    ManyToMany,
    PrimaryGeneratedColumn,
 } from "typeorm";
 import { Role } from "./Role";
 import { Customer } from "./Customer";
 import { Artist } from "./Artist";
 
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

   @OneToOne(() => Customer, (client: Customer) => client.user)
   customer?: Customer;

   @OneToOne(() => Artist, (artist) => artist.user)
   artist?: Artist;
 }


