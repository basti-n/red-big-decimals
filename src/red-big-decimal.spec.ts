import { BigDecimal } from './red-big-decimal';

describe('BigDecimal', () => {
  describe('add', () => {
    describe('as number', () => {
      it('should return 2.25', () => {
        const result = new BigDecimal(2).add(0.25);
        expect(result.toNumber()).toEqual(2.25);
      });

      it('should return 9007199254740995', () => {
        const result = new BigDecimal(Number.MAX_SAFE_INTEGER).add(5);
        expect(result.toNumber()).toEqual(9007199254740995);
      });

      it('should return 254.415', () => {
        const result = new BigDecimal(202.015).add(52.4);
        expect(result.toNumber(3)).toEqual(254.415);
      });

      it('should return 254.42', () => {
        const result = new BigDecimal(202.015).add(52.4);
        expect(result.toNumber()).toEqual(254.42);
      });

      it('should return 254.42', () => {
        const result = new BigDecimal(202.015).add(52.4);
        expect(result.toNumber(2)).toEqual(254.42);
      });
    });
  });

  describe('subtract', () => {
    describe('as number', () => {
      it('should return 0.1', () => {
        const result = new BigDecimal(0.3).subtract(0.2);
        expect(result.toNumber()).toEqual(0.1);
      });

      it('should return 0.115', () => {
        const result = new BigDecimal(202.015).subtract(201.9);
        expect(result.toNumber(3)).toEqual(0.115);
      });

      it('should return 0.12', () => {
        const result = new BigDecimal(202.015).subtract(201.9);
        expect(result.toNumber()).toEqual(0.12);
      });

      it('should return 4', () => {
        const result = new BigDecimal(12).subtract(8.0);
        expect(result.toNumber()).toEqual(4);
      });
    });
  });

  describe('multiply', () => {
    describe('as number', () => {
      it('should return 0.03', () => {
        const result = new BigDecimal(0.1).multiply(0.3);
        expect(result.toNumber()).toEqual(0.03);
      });

      it('should return 31.25', () => {
        const result = new BigDecimal(1.25).multiply(25);
        expect(result.toNumber()).toEqual(31.25);
      });
    });

    describe('as string', () => {
      it('should return 0.03', () => {
        const result = new BigDecimal(0.1).multiply(0.3);
        expect(result.toString()).toEqual('0.03');
      });

      it('should return 31.25', () => {
        const result = new BigDecimal(1.25).multiply(25);
        expect(result.toString()).toEqual('31.25');
      });
    });
  });

  describe('divide', () => {
    describe('as number', () => {
      it('should return 3', () => {
        const result = new BigDecimal(24).divide(8);
        expect(result.toNumber()).toEqual(3);
      });

      it('should return 1.93', () => {
        const result = new BigDecimal(87).divide(45);
        expect(result.toNumber()).toEqual(1.93);
      });

      it('should return 1.9333', () => {
        const result = new BigDecimal(87).divide(45);
        expect(result.toNumber(4)).toEqual(1.9333);
      });

      it('should return 2.30', () => {
        const result = new BigDecimal(99).divide(43);
        expect(result.toNumber()).toEqual(2.3);
      });

      it('should return 2.30', () => {
        const result = new BigDecimal(99).divide(43);
        expect(result.toNumber(5)).toEqual(2.30233);
      });
    });

    describe('as string', () => {
      it('should return 3', () => {
        const result = new BigDecimal(24).divide(8);
        expect(result.toString()).toEqual('3');
      });

      it('should return 1.93', () => {
        const result = new BigDecimal(87).divide(45);
        expect(result.toString()).toEqual('1.93');
      });
    });
  });
});
