import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductFeature } from './product-feature.entity';
import { ProductImage } from './product-image.entity';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductFeature, ProductImage])],
  controllers: [ProductController],
})
export class ProductModule {}