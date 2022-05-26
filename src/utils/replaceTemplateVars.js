// Matches "${expression}", and captures <expression> in a group
const templateRegex = /\$\{([^}]+)\}/gi;

// Matches "(expression)", with an optional prefix of Math.abs.
// Captures two groups: one, containing Math.abs (empty if not present),
// and two, containing <expression>
const parenthesesRegex = /(Math\.abs)?\(([^)]+)\)/gi;

const operators = {
  "+": (x, y) => x + y,
  "*": (x, y) => x * y,
  "-": (x, y) => x - y,
  "/": (x, y) => x / y,
};

// op is any binary operation (or multiple, i.e. "*/"). Matches
// "t1 ^ t2", where ^ is any single character of op, t1 and t2
// are alphanumeric. Captures three groups: one, t1, two, ^ (the operation),
// and 3, t2.
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

/**
 * Accepts a string and an optional configuration object.
 * Any template expressions in the string (delineated ${expression})
 * will be evaluated. Basic arithmetic (addition, subtraction, multiplication
 * and division) and absolute value (Math.abs) are supported.
 *
 * If a non-integer token is encountered, it must be specified as
 * a property of obj. If so, it will be replaced with obj[token].
 */
export function replaceTemplateVars(string, obj={}) {
  return string.replaceAll(templateRegex, (_, group) =>
    evaluateTemplateExpression(group, obj)
  );
}
