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

function compute(op, aRaw, bRaw) {
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
  compute,
};
