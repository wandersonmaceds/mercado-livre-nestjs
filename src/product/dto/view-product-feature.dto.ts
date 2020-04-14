import { Expose } from 'class-transformer';

@Expose()
export class ViewProductFeatureDTO {
  constructor(readonly name: string, readonly description: string) {}
}
