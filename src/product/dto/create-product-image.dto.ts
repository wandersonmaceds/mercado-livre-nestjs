import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ProductImage } from '../product-image.entity';

export class CreateProductImageDTO {
  @IsNotEmpty()
  @Expose()
  readonly path: string;

  toModel() {
    return new ProductImage(this.path);
  }
}
