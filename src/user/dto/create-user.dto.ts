import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDTO {

    @IsEmail()
    login: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}