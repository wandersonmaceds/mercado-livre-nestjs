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
  constructor(name, price, quantity, description) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }

  addFeatures(feature: ProductFeature | ProductFeature[]) {
    if (!this.features) this.features = [];

    this.features.push(...this.features.concat(feature));
  }

  addImages(image: ProductImage | ProductImage[]) {
    if (!this.images) this.images = [];
    this.images.push(...this.images.concat(image));
  }

  @PrimaryGeneratedColumn()
  readonly id: number;

  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt: Date;

  @IsNotEmpty()
  @Column()
  readonly name: string;

  @Column({ type: 'decimal' })
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
    { cascade: true, eager: true },
  )
  @ArrayMinSize(3)
  features: ProductFeature[];

  @OneToMany(
    type => ProductImage,
    p => p.product,
    { cascade: true, eager: true },
  )
  @ArrayMinSize(1)
  images: ProductImage[];
}
