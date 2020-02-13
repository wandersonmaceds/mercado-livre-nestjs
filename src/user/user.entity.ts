import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn } from "typeorm";
import  * as bcrypt from "bcrypt";

@Entity()
export class User{

    /**
     * 
     * @param login a valid email must be passed
     * @param password a plain text (not encrypted)
     */
    constructor(login: string, password: string) {
        this.login = login;
        this.password = password ?? '';
    }

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