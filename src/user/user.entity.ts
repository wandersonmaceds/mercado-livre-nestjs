import * as bcrypt from 'bcrypt';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ViewUserDTO } from './dto/view-user.dto';

@Entity()
export class User {
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
  readonly id: number;

  @CreateDateColumn()
  private createdAt: Date;

  @Column()
  login: string;

  @Column({ name: 'password' })
  private _password: string;

  /**
   * @param plainText set the password not encrypted.
   */
  private set password(plainText: string) {
    this._password = bcrypt.hashSync(plainText, bcrypt.genSaltSync());
  }

  /**
   *
   * @param password a plain text to compare to the actual password
   */
  isPasswordValid(password: string) {
    return bcrypt.compareSync(password, this._password);
  }

  toViewDTO(): ViewUserDTO {
    return new ViewUserDTO(this.login);
  }
}
