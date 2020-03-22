import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';
import { ProductQuestion } from 'src/product/product-question.entity';

export class CreateProductQuestionDTO {
  @IsNotEmpty()
  readonly title: string;

  toModel(product: Product, user: User) {
    return new ProductQuestion(product, user, this.title);
  }
}
