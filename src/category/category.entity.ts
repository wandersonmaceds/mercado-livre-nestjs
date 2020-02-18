import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Optional } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

@Entity()
@Unique(['name'])
export class Category {
  /**
   *
   * @param name Category name as string
   * @param parent Optional Parent Category ID
   */
  constructor(name: string, category?: Category) {
    this.name = name;
    this.parent = category ?? null;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  readonly name: string;

  @ManyToOne(
    type => Category,
    category => category.id,
  )
  @Optional()
  readonly parent: Category;
}
