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
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductFeature } from './product-feature.entity';
import { ProductImage } from './product-image.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Product {
  constructor(
    user: User,
    name: string,
    price: number,
    quantity: number,
    description: string,
  ) {
    this.user = user;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }

  addFeatures(features: ProductFeature[]) {
    if (!this.features) this.features = [];

    this.features.push(...this.features.concat(features));
  }

  addImages(images: ProductImage[]) {
    if (!this.images) this.images = [];
    this.images.push(...this.images.concat(images));
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

  @ManyToOne(type => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
