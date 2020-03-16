import { Product } from './product.entity';
import { User } from 'src/user/user.entity';
import { IsNumber, Min, Max, IsNotEmpty, MaxLength } from 'class-validator';
import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class ProductRating {
  constructor(
    product: Product,
    user: User,
    rate: number,
    title: string,
    comment: string,
  ) {
    this.product = product;
    this.user = user;
    this.rate = rate;
    this.title = title;
    this.comment = comment;
  }

  @PrimaryGeneratedColumn()
  private readonly id: number;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'user_id' })
  readonly user: User;

  @ManyToOne(type => Product)
  @JoinColumn({ name: 'product_id' })
  readonly product: Product;

  @IsNumber()
  @Min(1)
  @Max(5)
  @Column({ type: 'int' })
  readonly rate: number;

  @IsNotEmpty()
  @Column()
  readonly title: string;

  @IsNotEmpty()
  @MaxLength(500)
  @Column({ type: 'text' })
  readonly comment: string;
}
