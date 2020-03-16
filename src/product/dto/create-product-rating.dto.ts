import { User } from 'src/user/user.entity';
import { Product } from '../product.entity';
import { ProductRating } from '../product-rating.entity';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class CreateProductRatingDTO {
  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rating: number;

  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @MaxLength(500)
  readonly comment: string;

  toModel(product: Product, user: User) {
    return new ProductRating(
      product,
      user,
      this.rating,
      this.title,
      this.comment,
    );
  }
}
