// Supported operations:
// add (or +)  : addition
// sub (or -)  : subtraction
// mul (or *)  : multiplication
// div (or /)  : division

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

function mod(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero');
  }
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    const e = new Error('Square root of negative number');
    e.code = 'ENEGSQRT';
    throw e;
  }
  return Math.sqrt(n);
}

function compute(op, aRaw, bRaw) {
  // Support unary sqrt and binary operations
  const unaryOps = ['sqrt', '√'];
  if (unaryOps.includes(op)) {
    const a = toNumber(aRaw);
    if (Number.isNaN(a)) {
      const e = new Error('Invalid numeric operand');
      e.code = 'EINVALID';
      throw e;
    }

    switch (op) {
      case 'sqrt':
      case '√':
        return squareRoot(a);
      default: {
        const e = new Error(`Unsupported operation: ${op}`);
        e.code = 'EUNSUP';
        throw e;
      }
    }
  }

  const a = toNumber(aRaw);
  const b = toNumber(bRaw);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    const e = new Error('Invalid numeric operands');
    e.code = 'EINVALID';
    throw e;
  }

  switch (op) {
    case 'add':
    case '+':
      return add(a, b);
    case 'sub':
    case '-':
      return sub(a, b);
    case 'mul':
    case '*':
    case 'x':
    case 'X':
    case 'times':
      return mul(a, b);
    case 'div':
    case '/':
    case '÷':
      return div(a, b);
    case 'mod':
    case '%':
      return mod(a, b);
    case 'pow':
    case '^':
    case '**':
      return power(a, b);
    default: {
      const e = new Error(`Unsupported operation: ${op}`);
      e.code = 'EUNSUP';
      throw e;
    }
  }
}

module.exports = {
  add,
  sub,
  mul,
  div,
  mod,
  power,
  squareRoot,
  compute,
};
