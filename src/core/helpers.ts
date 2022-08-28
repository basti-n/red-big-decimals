import { TRAILING_ZEROS_REGEXP } from './constants';
import { BigDecimalConfig } from '../types/big-decimal-config';

function getIntegerAndDecimals(
  value: string | number
): [integers: string, decimals: string] {
  return String(value).split('.').concat('') as [
    integers: string,
    decimals: string
  ];
}

export function parseToFloatingPointBigInt(
  value: string | number,
  { precision }: BigDecimalConfig
): bigint {
  const [integers, decimals] = getIntegerAndDecimals(value);

  return (
    BigInt(integers + decimals.padEnd(precision, '0').slice(0, precision)) +
    BigInt(decimals[precision] >= '5')
  );
}

export function bigIntToString(
  value: bigint,
  roundTo: number,
  { precision }: BigDecimalConfig
): string {
  const stringifiedValue = value.toString().padStart(precision + 1, '0');

  const integer = stringifiedValue.slice(0, -precision);
  const rawDecimals = stringifiedValue.slice(-precision);
  const decimals = rawDecimals
    .slice(0, roundTo)
    .replace(TRAILING_ZEROS_REGEXP, '');

  if (!decimals?.length) {
    return integer;
  }

  const lastDecimal = parseInt(decimals[decimals.length - 1], 10);
  const nextDecimalAfterLastDecimal = parseInt(
    rawDecimals[decimals.length],
    10
  );
  const allExceptLastDecimal = decimals.slice(0, decimals.length - 1);
  const finalDecimals = `${allExceptLastDecimal}${
    nextDecimalAfterLastDecimal >= 5 ? lastDecimal + 1 : lastDecimal
  }`;

  return `${integer}${finalDecimals.length ? '.' + finalDecimals : ''}`;
}

export function bigIntToNumber(
  value: bigint,
  roundTo: number,
  config: BigDecimalConfig
): number {
  return parseFloat(bigIntToString(value, roundTo, config));
}
