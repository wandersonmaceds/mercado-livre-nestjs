import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Optional } from '@nestjs/common';
import { IsNotEmpty, Validate } from 'class-validator';
import { ParentCategoryExistsConstraint } from './validator/parent-category-exists.constraint';

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

  @ManyToOne(
    type => Category,
    category => category.id,
  )
  @Optional()
  readonly parent: Category;
}
