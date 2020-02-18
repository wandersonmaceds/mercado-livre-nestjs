import { Controller, Post, HttpStatus, HttpCode, Body } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { STATUS_CODES } from "http";
import { CreateUserDTO } from "./dto/create-user.dto";

@Controller('user')
export class UserController {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() userDTO: CreateUserDTO) {
        const user = new User(userDTO.login, userDTO.password);
        await this.userRepository.insert(user);
    }
}