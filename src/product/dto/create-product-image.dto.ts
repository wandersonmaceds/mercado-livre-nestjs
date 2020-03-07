import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateProductImageDTO {
  @IsNotEmpty()
  @Expose()
  readonly path: string;
}
