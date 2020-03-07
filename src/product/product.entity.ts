import {
  ArrayMinSize,
  IsInt,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductFeature } from './product-feature.entity';
import { ProductImage } from './product-image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt: Date;

  @IsNotEmpty()
  @Column()
  readonly name: string;

  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  readonly price: number;

  @Column({ default: 0 })
  @IsInt()
  @Min(0)
  readonly quantity: number;

  @Column({ type: 'text' })
  @MaxLength(1000)
  readonly description: string;

  @OneToMany(
    type => ProductFeature,
    p => p.product,
  )
  @ArrayMinSize(3)
  readonly features: ProductFeature[];

  @OneToMany(
    type => ProductImage,
    p => p.product,
  )
  @ArrayMinSize(1)
  readonly images: ProductImage[];
}
