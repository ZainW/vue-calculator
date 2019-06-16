import * as mathHelpers from '@/utils/mathHelpers';

describe('mathHerlpers Utils', () => {
  it('adds two numbers together', () => {
    expect(mathHelpers.add(1, 2)).toBe(3);
    expect(mathHelpers.add(-1, -2)).toBe(-3);
  });

  it('subtracts the first number  by the second number (param1 - param2)', () => {
    expect(mathHelpers.subtract(1, 2)).toBe(-1);
    expect(mathHelpers.subtract(2, 2)).toBe(0);
  });

  it('multiplies two numbers together', () => {
    expect(mathHelpers.multiply(1, 2)).toBe(2);
    expect(mathHelpers.multiply(2, 2)).toBe(4);
  });

  it('divides the first number  by the second number (param1 / param2) ', () => {
    expect(mathHelpers.divide(1, 2)).toBe(0.5);
    expect(mathHelpers.divide(2, 2)).toBe(1);
  });

  it('converts a percentage to a number', () => {
    expect(mathHelpers.percentage(100)).toBe(1);
    expect(mathHelpers.percentage(50)).toBe(0.5);
  });

  it('removes leading zeroes from a string representing a number', () => {
    expect(mathHelpers.removeLeadingZeroes('0000100')).toBe('100');
    expect(mathHelpers.removeLeadingZeroes('0005043')).toBe('5043');
  });
});
