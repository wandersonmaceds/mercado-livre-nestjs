import { Expose } from 'class-transformer';

@Expose()
export class ViewUserDTO {
  constructor(readonly login: string) {}
}
