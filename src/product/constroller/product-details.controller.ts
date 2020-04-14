import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product.entity';

@Controller('product/:id/details')
export class ProductDetailsController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  @Get()
  async show(@Param('id') id: number) {
    const product = await this.productRepository.findOne(id);
    return product.toViewDTO();
  }
}
