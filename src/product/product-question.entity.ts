import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  AfterInsert,
} from 'typeorm';
import { Product } from './product.entity';
import { Message } from 'src/message/message';
import { MessageService } from 'src/message/message.service';

@Entity()
export class ProductQuestion {
  private readonly messageService = new MessageService();

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

  @AfterInsert()
  private notifyAskedQuestion() {
    const messageTitle = `Você tem uma nova pergunta sobre seus produtos!`;
    const messageBody = `Produto: ${this.product.name}\nPergunta: ${this.title}`;

    const message = new Message(
      this.user.login,
      this.product.user.login,
      messageTitle,
      messageBody,
    );

    this.messageService.sendMessage(message);
  }
}
