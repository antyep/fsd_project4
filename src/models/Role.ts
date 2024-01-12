import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
 } from "typeorm";
 import { User } from "./User";
 
 @Entity("roles")
 export class Role {
	@PrimaryGeneratedColumn()
	id!: number;
 
	@Column()
	name!: string; 

    @Column()
	createdAt!: Date;
    
    @Column()
	updatedAt!: Date; 
 
	@ManyToMany(() => User, (user: User) => user.roles)
	@JoinTable({
	   name: "roles",
	   joinColumn: {
		  name: "role_id",
		  referencedColumnName: "id",
       },
	   inverseJoinColumn: {
		  name: "user_id",
		  referencedColumnName: "id",
	}, 
	})
	users?: User[];
 }