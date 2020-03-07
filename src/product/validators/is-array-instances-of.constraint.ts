import { plainToClass } from 'class-transformer';
import {
  validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'array of instance items', async: true })
export class IsArrayInstancesOf implements ValidatorConstraintInterface {
  async validate(
    values: any[],
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (!values) return false;
    const clazz = validationArguments.constraints[0];

    const transforms = plainToClass(clazz, values, {
      excludeExtraneousValues: true,
    });
    const validations = transforms.map(item => validate(item));
    const validationsResults = await Promise.all(validations);
    const results = validationsResults.map(vr => vr.length > 0);

    return !results.includes(true);
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `The ${validationArguments.property} must be an instance of ${validationArguments.constraints[0]}`;
  }
}
