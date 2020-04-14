import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Param,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './product.entity';
import { CreateProductRatingDTO } from './dto/create-product-rating.dto';
import { ProductRating } from './product-rating.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('product')
export class ProductController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductRating)
    private readonly productRatingRepository: Repository<ProductRating>,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() productDto: CreateProductDTO, @Request() request) {
    const product = productDto.toModel(request.user);
    this.productRepository.save(product);
  }

  @Post(':id/rating/')
  @HttpCode(HttpStatus.OK)
  async rate(
    @Param('id') productId: number,
    @Body() productRatingDto: CreateProductRatingDTO,
    @Request() request,
  ) {
    const product = await this.productRepository.findOne(productId);
    const productRating = productRatingDto.toModel(product, request.user);

    this.productRatingRepository.save(productRating);
  }

  @Get(':id')
  async show(@Param(':id') id: number) {
    const product = await this.productRepository.find({
      where: { id },
      relations: ['question', 'rating', 'feature', 'image'],
    });

    return product;
  }
}
