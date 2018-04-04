import { AbstractControl, ValidatorFn } from '@angular/forms';

export class NumberValidators {

  static maxDecimalPlaces(maxDecimalPlaces): ValidatorFn {
    return (c: AbstractControl): { decimalPlaces: number } | null => {
      const splitValue: Array<string> = c.value.toString().split('.'),
        decimalPlaces = splitValue.length
          ? splitValue[splitValue.length - 1].length
          : 0;

      if (maxDecimalPlaces < decimalPlaces) {
        return {decimalPlaces};
      }

      return null;
    };
  }
}