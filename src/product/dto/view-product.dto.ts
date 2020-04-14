import { Expose } from 'class-transformer';
import { ViewUserDTO } from 'src/user/dto/view-user.dto';
import { ViewProductFeatureDTO } from './view-product-feature.dto';
import { ViewProductImageDTO } from './view-product-image.dto';

@Expose()
export class ViewProductDTO {
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly name: string,
    readonly price: number,
    readonly quantity: number,
    readonly description: string,
    readonly features: ViewProductFeatureDTO[],
    readonly images: ViewProductImageDTO[],
    readonly user: ViewUserDTO,
  ) {}
}
