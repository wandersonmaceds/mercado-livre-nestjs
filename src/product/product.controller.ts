import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './product.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('product')
export class ProductController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() productDto: CreateProductDTO, @Request() request) {
    const product = productDto.toModel(request.user);
    this.productRepository.save(product);
  }
}
