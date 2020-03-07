import { IsNotEmpty } from 'class-validator';

export class CreateProductImageDTO {
  @IsNotEmpty()
  readonly path: string;
}
