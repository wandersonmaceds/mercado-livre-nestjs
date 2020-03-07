import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ProductFeature } from '../product-feature.entity';

export class CreateProductFeatureDTO {
  @IsNotEmpty()
  @Expose()
  readonly name: string;

  @IsNotEmpty()
  @Expose()
  readonly description: string;

  toModel() {
    return new ProductFeature(this.name, this.description);
  }
}
