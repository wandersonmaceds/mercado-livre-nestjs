import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Product } from './product.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(
    type => Product,
    p => p.id,
  )
  @JoinColumn({ name: 'product_id' })
  readonly product: number;

  @Column()
  @IsNotEmpty()
  readonly path: string;
}
