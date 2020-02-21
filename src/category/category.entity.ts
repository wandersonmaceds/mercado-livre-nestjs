import { Optional } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

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
  readonly id: number;

  @Column()
  @IsNotEmpty()
  readonly name: string;

  @ManyToOne(type => Category)
  @Optional()
  readonly parent: Category;
}
