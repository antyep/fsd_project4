import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn,
 } from "typeorm";
 import { Role } from "./Role";
//  import { Artist } from "./Student";
//  import { Customer } from "./Teacher";
 
 @Entity("artists")
 export class Artist {
    @PrimaryGeneratedColumn()
    id?: number;
 }

