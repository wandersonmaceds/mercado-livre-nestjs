import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Category } from './category/category.entity';
import { CategoryModule } from './category/category.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { Product } from './product/product.entity';
import { ProductFeature } from './product/product-feature.entity';
import { ProductImage } from './product/product-image.entity';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Category, Product, ProductFeature, ProductImage],
      synchronize: true,
    }),
    UserModule,
    CategoryModule,
    AuthModule,
    ProductModule,
  ],
})
export class AppModule {}
