import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsInt,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  Validate,
} from 'class-validator';
import { Product } from '../product.entity';
import { IsArrayInstancesOf } from '../validators/is-array-instances-of.constraint';
import { CreateProductFeatureDTO } from './create-product-feature.dto';
import { CreateProductImageDTO } from './create-product-image.dto';
import { User } from 'src/user/user.entity';

export class CreateProductDTO {
  @IsNotEmpty()
  readonly name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  readonly price: number;

  @IsInt()
  @Min(0)
  readonly quantity: number = 0;

  @MaxLength(1000)
  readonly description: string;

  @ArrayMinSize(3)
  @Validate(IsArrayInstancesOf, [CreateProductFeatureDTO])
  @Type(() => CreateProductFeatureDTO)
  readonly features: CreateProductFeatureDTO[];

  @ArrayMinSize(1)
  @Validate(IsArrayInstancesOf, [CreateProductImageDTO])
  @Type(() => CreateProductImageDTO)
  readonly images: CreateProductImageDTO[];

  toModel(user: User) {
    const model = new Product(
      user,
      this.name,
      this.price,
      this.quantity,
      this.description,
    );

    model.addFeatures(this.features.map(feat => feat.toModel()));
    model.addImages(this.images.map(img => img.toModel()));

    return model;
  }
}
