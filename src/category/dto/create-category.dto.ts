import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class CreateCategoryDTO {

    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsNumber()
    parentId: number;
}