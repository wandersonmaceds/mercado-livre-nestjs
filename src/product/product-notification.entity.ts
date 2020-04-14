import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductNotification implements Notificable {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt: Date;

  @Column()
  readonly title: string;

  @Column()
  readonly body: string;

  @ManyToOne(
    () => Product,
    p => p.id,
  )
  @JoinColumn()
  readonly product: Product;

  @ManyToOne(
    () => User,
    u => u.id,
  )
  @JoinColumn({ name: 'product_owner' })
  readonly productOwner: User;

  @ManyToOne(
    () => User,
    u => u.id,
  )
  @JoinColumn()
  readonly client: User;

  constructor(
    title: string,
    body: string,
    product: Product,
    productOwner: User,
    client: User,
  ) {
    this.title = title;
    this.body = body;
    this.product = product;
    this.productOwner = productOwner;
    this.client = client;
  }

  toNotification() {
    return `
    Notification to ${this.productOwner.login}.
    Product: ${this.product.name}.
    Sent from: ${this.client.login}.
    Message: \n\n${this.title}\n\n${this.body}`;
  }
}
