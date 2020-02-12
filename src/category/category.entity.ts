import { Entity, PrimaryGeneratedColumn, Column, OneToOne, Unique } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
@Unique(["name"])
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(type => Category, parent => parent.id)
    @Column({ nullable: true })
    parent: number;
}
