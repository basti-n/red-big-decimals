import { TRAILING_ZEROS_REGEXP } from "./constants";
import { BigDecimalConfig } from "../types/big-decimal-config";

function getIntegerAndDecimals(
  value: string | number
): [integers: string, decimals: string] {
  return String(value).split(".").concat("") as [
    integers: string,
    decimals: string
  ];
}

export function parseToBigInt(
  value: string | number,
  { precision }: BigDecimalConfig
): bigint {
  const [integers, decimals] = getIntegerAndDecimals(value);

  return (
    BigInt(integers + decimals.padEnd(precision, "0").slice(0, precision)) +
    BigInt(decimals[precision] >= "5")
  );
}

export function bigIntToString(
  value: bigint,
  { precision }: BigDecimalConfig
): string {
  const stringifiedValue = value.toString().padStart(precision + 1, "0");

  return (
    stringifiedValue.slice(0, -precision) +
    "." +
    stringifiedValue.slice(-precision).replace(TRAILING_ZEROS_REGEXP, "")
  );
}

export function bigIntToNumber(
  value: bigint,
  { precision }: BigDecimalConfig
): number {
  return (
    Math.round(parseFloat(value.toString()) * 10 ** precision) / 10 ** precision
  );
}
