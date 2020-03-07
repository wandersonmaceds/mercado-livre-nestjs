import {
  ArrayMinSize,
  IsInt,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
} from 'class-validator';
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
  readonly quantity: number;

  @MaxLength(1000)
  readonly description: string;

  @ArrayMinSize(3)
  readonly features: CreateProductFeatureDTO[];

  @ArrayMinSize(1)
  readonly images: CreateProductImageDTO[];
}
