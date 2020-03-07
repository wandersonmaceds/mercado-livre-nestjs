import {
  ArrayMinSize,
  IsInt,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  Validate,
} from 'class-validator';
import { IsArrayInstancesOf } from '../validators/is-array-instances-of.constraint';
import { CreateProductFeatureDTO } from './create-product-feature.dto';
import { CreateProductImageDTO } from './create-product-image.dto';

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
  readonly features: CreateProductFeatureDTO[];

  @ArrayMinSize(1)
  @Validate(IsArrayInstancesOf, [CreateProductImageDTO])
  readonly images: CreateProductImageDTO[];
}
