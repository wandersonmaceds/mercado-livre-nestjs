import { Expose } from 'class-transformer';

@Expose()
export class ViewProductImageDTO {
  constructor(readonly path: string) {}
}
