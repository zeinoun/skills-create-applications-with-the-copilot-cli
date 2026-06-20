const { add, sub, mul, div, compute } = require('../calculator');

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

  test('invalid numeric operands throw EINVALID', () => {
    expect(() => compute('+', 'a', 1)).toThrow();
    try {
      compute('+', 'a', 1);
    } catch (err) {
      expect(err.code).toBe('EINVALID');
    }
  });

  test('unsupported operation throws EUNSUP', () => {
    expect(() => compute('pow', 2, 3)).toThrow();
    try {
      compute('pow', 2, 3);
    } catch (err) {
      expect(err.code).toBe('EUNSUP');
    }
  });
});
