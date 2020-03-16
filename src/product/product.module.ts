import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductFeature } from './product-feature.entity';
import { ProductImage } from './product-image.entity';
import { ProductController } from './product.controller';
import { ProductRating } from './product-rating.entity';
import { ProductQuestionController } from './constroller/product-question.controller';
import { ProductQuestion } from './product-question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductFeature,
      ProductImage,
      ProductRating,
      ProductQuestion,
    ]),
  ],
  controllers: [ProductController, ProductQuestionController],
})
export class ProductModule {}
