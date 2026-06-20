const { add, sub, mul, div, mod, power, squareRoot, compute } = require('../calculator');

describe('calculator basic operations', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
    expect(compute('+', 2, 3)).toBe(5);
    expect(compute('add', 2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(sub(10, 4)).toBe(6);
    expect(compute('-', 10, 4)).toBe(6);
    expect(compute('sub', 10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(mul(45, 2)).toBe(90);
    expect(compute('*', 45, 2)).toBe(90);
    expect(compute('mul', 45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(div(20, 5)).toBe(4);
    expect(compute('/', 20, 5)).toBe(4);
    expect(compute('div', 20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => div(1, 0)).toThrow(/Division by zero/);
    expect(() => compute('/', 1, 0)).toThrow(/Division by zero/);
  });

  test('modulo: 10 % 3 = 1 and modulo by zero throws', () => {
    expect(mod(10, 3)).toBe(1);
    expect(compute('%', 10, 3)).toBe(1);
    expect(compute('mod', 10, 3)).toBe(1);
    expect(() => mod(1, 0)).toThrow(/Modulo by zero/);
    expect(() => compute('%', 1, 0)).toThrow(/Modulo by zero/);
  });

  test('power: 2 ^ 8 = 256', () => {
    expect(power(2, 8)).toBe(256);
    expect(compute('^', 2, 8)).toBe(256);
    expect(compute('pow', 2, 8)).toBe(256);
  });

  test('square root: sqrt 9 = 3 and negative sqrt throws', () => {
    expect(squareRoot(9)).toBe(3);
    expect(compute('sqrt', 9)).toBe(3);
    expect(() => squareRoot(-1)).toThrow(/Square root of negative number/);
    expect(() => compute('sqrt', -1)).toThrow(/Square root of negative number/);
  });

  test('invalid numeric operands throw EINVALID', () => {
    expect(() => compute('+', 'a', 1)).toThrow();
    try {
      compute('+', 'a', 1);
    } catch (err) {
      expect(err.code).toBe('EINVALID');
    }
  });

  test('unsupported operation throws EUNSUP', () => {
    expect(() => compute('foo', 2, 3)).toThrow();
    try {
      compute('foo', 2, 3);
    } catch (err) {
      expect(err.code).toBe('EUNSUP');
    }
  });
});
