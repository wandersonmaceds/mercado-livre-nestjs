import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Product } from './product.entity';
import { ViewProductFeatureDTO } from './dto/view-product-feature.dto';

@Entity({ name: 'product_feature' })
export class ProductFeature {
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
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

  toViewDTO(): ViewProductFeatureDTO {
    return new ViewProductFeatureDTO(this.name, this.description);
  }
}
