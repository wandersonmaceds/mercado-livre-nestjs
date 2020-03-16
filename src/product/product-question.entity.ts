import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductQuestion {
  constructor(product: Product, user: User, title: string) {
    this.title = title;
    this.product = product;
    this.user = user;
  }

  @PrimaryGeneratedColumn()
  readonly id: number;

  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt: Date;

  @IsNotEmpty()
  @Column()
  readonly title: string;

  @ManyToOne(
    () => Product,
    p => p.id,
  )
  @JoinColumn({ name: 'product_id' })
  readonly product: Product;

  @ManyToOne(
    () => User,
    u => u.id,
  )
  @JoinColumn({ name: 'user_id' })
  readonly user: User;
}
