import { Controller, Post, HttpCode, HttpStatus, Body, BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCategoryDTO } from "./dto/create-category.dto";

@Controller('category')
export class CategoryController {

    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() categoryDTO: CreateCategoryDTO) {
        const category = new Category();
        category.name = categoryDTO.name;
    
        this.categoryRepository.insert(category);
    }
}