import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn } from "typeorm";
import  * as bcrypt from "bcrypt";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    private id: number;

    @CreateDateColumn()
    private createdAt: Date;

    @Column()
    login: string;
    
    @Column({ name: 'password'})
    private _password: string;
    
    /**
     * @param plainText set the password not encrypted.
     */
    set password(plainText: string) {
        this._password = bcrypt.hashSync(plainText, bcrypt.genSaltSync());
    }
}