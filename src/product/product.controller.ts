import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductFeature } from './product-feature.entity';
import { ProductImage } from './product-image.entity';
import { Product } from './product.entity';

@Controller('product')
export class ProductController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() productDto: CreateProductDTO) {
    const product = productDto.toModel();
    this.productRepository.save(product);
  }
}
