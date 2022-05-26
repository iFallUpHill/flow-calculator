const templateRegex = /\$\{([^}]+)\}/gi;

const operators = {
  "+": (x, y) => x + y,
  "*": (x, y) => x * y,
  "-": (x, y) => x - y,
  "/": (x, y) => x / y,
};

const parenthesesRegex = /(Math\.abs)?\(([^)]+)\)/gi;

const binaryOpRegex = (op) => new RegExp(`(\\w+)\\s*([${op}])\\s*(\\w+)`, 'g');

const parseTerm = (term, obj) => obj[term] || parseInt(term);

function evaluateTemplateExpression(expression, obj) {
  console.log(`original: ${expression}`)

  console.log(expression.match(parenthesesRegex));
  while (expression.match(parenthesesRegex)) {
    expression = expression.replaceAll(parenthesesRegex, (_, abs, exp) =>
      abs
        ? Math.abs(evaluateTemplateExpression(exp, obj))
        : evaluateTemplateExpression(exp, obj)
    );
  }


  console.log(`after parentheses: ${expression}`)

  while (expression.match(binaryOpRegex("*/"))) {
    expression = expression.replaceAll(binaryOpRegex("*/"), (_, t1, op, t2) =>
      operators[op](parseTerm(t1, obj), parseTerm(t2, obj))
    );
  }

  console.log(`after multiplication/division: ${expression}`)

  while (expression.match(binaryOpRegex("+-"))) {
    expression = expression.replaceAll(binaryOpRegex("+-"), (_, t1, op, t2) =>
      operators[op](parseTerm(t1, obj), parseTerm(t2, obj))
    );
  }

  console.log(`after addition/subtraction: ${expression}`)

  return parseTerm(expression, obj);
}

export function replaceTemplateVars(string, obj) {
  return string.replaceAll(templateRegex, (_, group) =>
    evaluateTemplateExpression(group, obj)
  );
}
