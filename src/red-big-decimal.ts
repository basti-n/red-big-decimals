import { defaultConfig } from './core/config';
import { SHIFT } from './core/constants';
import {
  bigIntToNumber,
  bigIntToString,
  parseToFloatingPointBigInt,
} from './core/helpers';
import { BigDecimalConfig } from './types/big-decimal-config';

export class BigDecimal {
  #number: bigint;
  #config: BigDecimalConfig;

  constructor(
    value: string | number | bigint | BigDecimal,
    config?: BigDecimalConfig
  ) {
    if (value instanceof BigDecimal) {
      value.#config = { ...defaultConfig, ...(config ?? {}) };
      return value;
    }

    this.#config = { ...defaultConfig, ...(config ?? {}) };
    if (typeof value === 'bigint') {
      this.#number = value;
    } else {
      this.#number = parseToFloatingPointBigInt(value, this.#config);
    }
  }

  private static divide(numerator: bigint, denominator: bigint): BigDecimal {
    return BigDecimal.fromBigInt(
      numerator / denominator + (((numerator * 2n) / denominator) % 2n)
    );
  }

  static fromBigInt(bigint: bigint): BigDecimal {
    return new BigDecimal(bigint);
  }

  add(num: number): BigDecimal {
    return BigDecimal.fromBigInt(this.#number + new BigDecimal(num).#number);
  }

  subtract(num: number): BigDecimal {
    return BigDecimal.fromBigInt(this.#number - new BigDecimal(num).#number);
  }

  multiply(num: number): BigDecimal {
    return BigDecimal.divide(this.#number * new BigDecimal(num).#number, SHIFT);
  }

  divide(num: number): BigDecimal {
    return BigDecimal.divide(this.#number * SHIFT, new BigDecimal(num).#number);
  }

  toString(roundTo = 2): string {
    return bigIntToString(this.#number, roundTo, this.#config);
  }

  toNumber(roundTo = 2): number {
    return bigIntToNumber(this.#number, roundTo, this.#config);
  }
}
