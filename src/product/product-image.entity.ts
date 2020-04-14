import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Product } from './product.entity';
import { ViewProductImageDTO } from './dto/view-product-image.dto';

@Entity()
export class ProductImage {
  constructor(path: string) {
    this.path = path;
  }

  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(
    type => Product,
    p => p.id,
  )
  @JoinColumn({ name: 'product_id' })
  readonly product: Product;

  @Column()
  @IsNotEmpty()
  readonly path: string;

  toViewDTO() {
    return new ViewProductImageDTO(this.path);
  }
}
