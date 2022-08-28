import { parseToFloatingPointBigInt } from './helpers';
import { defaultConfig } from './config';

describe('parseToFloatingPointBigInt', () => {
  describe('with input type "number"', () => {
    it('should return 22500000000n', () => {
      expect(parseToFloatingPointBigInt(2.25, defaultConfig)).toEqual(
        225000000000000000000n
      );
    });

    it('should return 200000000000000000000n', () => {
      expect(parseToFloatingPointBigInt(2, defaultConfig)).toEqual(
        200000000000000000000n
      );
    });

    it('should return ', () => {
      expect(parseToFloatingPointBigInt(-2, defaultConfig)).toEqual(
        -200000000000000000000n
      );
    });

    it('should return 910719925474099200000000000000000000n', () => {
      expect(
        parseToFloatingPointBigInt(9107199254740991, defaultConfig)
      ).toEqual(910719925474099200000000000000000000n);
    });
  });

  describe('with input type string', () => {
    it('should return 200000000000000000000n', () => {
      expect(parseToFloatingPointBigInt('2.0', defaultConfig)).toEqual(
        200000000000000000000n
      );
    });

    it('should return 200000000000000000000n', () => {
      expect(parseToFloatingPointBigInt('2', defaultConfig)).toEqual(
        200000000000000000000n
      );
    });

    it('should return -200000000000000000000n', () => {
      expect(parseToFloatingPointBigInt('-2.0', defaultConfig)).toEqual(
        -200000000000000000000n
      );
    });

    it('should return 910719925474099100000000000000000000n', () => {
      expect(
        parseToFloatingPointBigInt('9107199254740991', defaultConfig)
      ).toEqual(910719925474099100000000000000000000n);
    });
  });
});
