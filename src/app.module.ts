import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Category } from './category/category.entity';
import { CategoryModule } from './category/category.module';
import { ProductFeature } from './product/product-feature.entity';
import { ProductImage } from './product/product-image.entity';
import { ProductRating } from './product/product-rating.entity';
import { Product } from './product/product.entity';
import { ProductModule } from './product/product.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        User,
        Category,
        Product,
        ProductFeature,
        ProductImage,
        ProductRating,
      ],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    CategoryModule,
    AuthModule,
    ProductModule,
  ],
})
export class AppModule {}
