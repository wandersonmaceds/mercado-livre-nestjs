import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { Category } from './category/category.entity';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Category],
      synchronize: true
    }),
    UserModule,
    CategoryModule
  ],
})
export class AppModule {}
