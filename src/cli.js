#!/usr/bin/env node
// CLI wrapper for calculator
// Supports: add (+), sub (-), mul (*), div (/)

const { compute } = require('./calculator');

function printHelp() {
  console.log(`Usage:
  node cli.js <operation> <a> <b>
  node cli.js <a> <operator> <b>

Operations supported:
  add, +    : addition
  sub, -    : subtraction
  mul, *    : multiplication
  div, /    : division

Examples:
  node cli.js add 3 5
  node cli.js 3 + 5

Flags:
  --help    Show this help
  --json    Output result as JSON {"result": number}
`);
}

function main(argv) {
  const args = argv.slice(2);
  if (args.length === 0 || args.includes('--help')) {
    printHelp();
    process.exit(0);
  }

  const jsonMode = args.includes('--json');
  const cleanArgs = args.filter(a => a !== '--json');

  let op, a, b;
  if (cleanArgs.length === 3) {
    // either: op a b  OR a op b
    // detect if first arg is an operation name
    const [p1, p2, p3] = cleanArgs;
    const maybeOpFirst = ['add','sub','mul','div','+','-','*','/','×','x','X','÷'].includes(p1) || ['add','sub','mul','div','+','-','*','/','×','x','X','÷'].includes(p2);
    if (['add','sub','mul','div','+','-','*','/','×','x','X','÷'].includes(p1)) {
      op = p1;
      a = p2;
      b = p3;
    } else if (['add','sub','mul','div','+','-','*','/','×','x','X','÷'].includes(p2)) {
      a = p1;
      op = p2;
      b = p3;
    } else {
      console.error('Invalid invocation. Use --help for usage.');
      process.exit(2);
    }
  } else {
    console.error('Invalid number of arguments. Use --help for usage.');
    process.exit(2);
  }

  try {
    const result = compute(op, a, b);
    if (jsonMode) {
      console.log(JSON.stringify({ result }));
    } else {
      console.log(result);
    }
    process.exit(0);
  } catch (err) {
    if (err.code === 'EINVALID') {
      console.error('Error: operands must be numbers');
      process.exit(3);
    }
    if (err.message && err.message.includes('Division by zero')) {
      console.error('Error: division by zero');
      process.exit(4);
    }
    if (err.code === 'EUNSUP') {
      console.error(err.message);
      process.exit(5);
    }
    console.error('Error:', err.message || String(err));
    process.exit(1);
  }
}

if (require.main === module) {
  main(process.argv);
}
