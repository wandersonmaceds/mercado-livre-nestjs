import { Body, Controller, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './product.entity';
import { STATUS_CODES } from 'http';

@Controller('product')
export class ProductController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() product: CreateProductDTO) {
    return product;
  }
}
