import { Entity, PrimaryGeneratedColumn, Column, OneToOne, Unique } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
@Unique(["name"])
export class Category {

    /**
     * 
     * @param name Category name as string
     * @param parent Optional Parent Category ID
     */
    constructor(name: string, parent?: number) {
        this.name = name;
        this.parent = parent ?? null;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    readonly name: string;

    @OneToOne(type => Category, parent => parent.id)
    @Column({ nullable: true })
    readonly parent: number;
}
