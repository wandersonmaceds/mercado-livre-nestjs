import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateProductFeatureDTO {
  @IsNotEmpty()
  @Expose()
  readonly name: string;

  @IsNotEmpty()
  @Expose()
  readonly description: string;
}
