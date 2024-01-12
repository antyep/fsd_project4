import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
	OneToOne,
	JoinColumn,
    PrimaryGeneratedColumn
 } from "typeorm";
 import { Role } from "./Role";
 import { User } from "./User";
 
 @Entity("customers")
 export class Customer {
    @PrimaryGeneratedColumn()
    id?: number;

	@OneToOne(() => User, (user: User) => user.customer)
	@JoinColumn({ name: "user_id" })
	user!: User;
 }


