import { IsNotEmpty } from 'class-validator';

export class CreateProductFeatureDTO {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;
}
