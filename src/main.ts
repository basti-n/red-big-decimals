import { ROUNDED, DECIMALS, SHIFT } from "./config";

class BigDecimal {
  #number: bigint;

  constructor(value: string | number | bigint | BigDecimal) {
    if (value instanceof BigDecimal) return value;

    if (typeof value === "bigint") {
      this.#number = value;
    } else {
      let [ints, decis] = String(value).split(".").concat("");
      this.#number =
        BigInt(ints + decis.padEnd(DECIMALS, "0").slice(0, DECIMALS)) +
        BigInt(ROUNDED && decis[DECIMALS] >= "5");
    }
  }

  private static _divRound(dividend: bigint, divisor: bigint) {
    return BigDecimal.fromBigInt(
      dividend / divisor + (ROUNDED ? ((dividend * 2n) / divisor) % 2n : 0n)
    );
  }

  static fromBigInt(bigint: bigint): BigDecimal {
    return new BigDecimal(bigint);
  }

  add(num: number) {
    return BigDecimal.fromBigInt(this.#number + new BigDecimal(num).#number);
  }

  subtract(num: number) {
    return BigDecimal.fromBigInt(this.#number - new BigDecimal(num).#number);
  }

  multiply(num: number) {
    return BigDecimal._divRound(
      this.#number * new BigDecimal(num).#number,
      SHIFT
    );
  }

  divide(num: number) {
    return BigDecimal._divRound(
      this.#number * SHIFT,
      new BigDecimal(num).#number
    );
  }

  toString() {
    const s = this.#number.toString().padStart(DECIMALS + 1, "0");
    return (
      s.slice(0, -DECIMALS) + "." + s.slice(-DECIMALS).replace(/\.?0+$/, "")
    );
  }

  toNumber(numberOfDecimals = 10): number {
    return (
      Math.round(parseFloat(this.toString()) * 10 ** numberOfDecimals) /
      10 ** numberOfDecimals
    );
  }
}

const a = new BigDecimal(0.3);
const result = a.subtract(0.1).toString();
console.log({ result });
