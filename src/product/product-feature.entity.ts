import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Product } from './product.entity';

@Entity({ name: 'product_feature' })
export class ProductFeature {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(type => Product)
  @JoinColumn({ name: 'product_id' })
  readonly product: Product;

  @Column()
  @IsNotEmpty()
  readonly name: string;

  @Column()
  @IsNotEmpty()
  readonly description: string;
}
