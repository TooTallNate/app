export interface NotEqualFilterExpression {
  operator: "ne";
  arg1: string;
  arg2:
    | StringFilterExpression
    | NumericFilterExpression
    | BooleanFilterExpression;
}

export interface EqualsFilterExpression {
  operator: "eq";
  arg1: string;
  arg2:
    | StringFilterExpression
    | NumericFilterExpression
    | BooleanFilterExpression;
}

export interface LessThanFilterExpression {
  operator: "lt";
  arg1: string;
  arg2: NumericFilterExpression;
}

export interface LessThanOrEqualFilterExpression {
  operator: "le";
  arg1: string;
  arg2: NumericFilterExpression;
}

export interface GreaterThanFilterExpression {
  operator: "gt";
  arg1: string;
  arg2: NumericFilterExpression;
}

export interface GreaterThanOrEqualFilterExpression {
  operator: "ge";
  arg1: string;
  arg2: NumericFilterExpression;
}

export interface StartsWithFilterExpression {
  operator: "startswith";
  arg1: string;
  arg2: StringFilterExpression;
}

export interface AndFilterExpression {
  operator: "and";
  args: BooleanFilterExpression[];
}

export interface OrFilterExpression {
  operator: "or";
  args: BooleanFilterExpression[];
}

export type NumericFilterExpression = number;
export type BooleanFilterExpression =
  | boolean
  | NotEqualFilterExpression
  | EqualsFilterExpression
  | LessThanFilterExpression
  | LessThanOrEqualFilterExpression
  | GreaterThanFilterExpression
  | GreaterThanOrEqualFilterExpression
  | AndFilterExpression
  | OrFilterExpression
  | StartsWithFilterExpression;
export type StringFilterExpression = string;

export type FilterExpression = BooleanFilterExpression;

export interface FilterFunctionArgument {
  notEquals(
    arg1: string,
    arg2: string | NumericFilterExpression | BooleanFilterExpression
  ): NotEqualFilterExpression;
  equals(
    arg1: string,
    arg2: string | NumericFilterExpression | BooleanFilterExpression
  ): EqualsFilterExpression;
  lessThan(
    arg1: string,
    arg2: NumericFilterExpression
  ): LessThanFilterExpression;
  lessThanOrEqual(
    arg1: string,
    arg2: NumericFilterExpression
  ): LessThanOrEqualFilterExpression;
  greaterThan(
    arg1: string,
    arg2: NumericFilterExpression
  ): GreaterThanFilterExpression;
  greaterThanOrEqual(
    arg1: string,
    arg2: NumericFilterExpression
  ): GreaterThanOrEqualFilterExpression;
  and(...args: BooleanFilterExpression[]): AndFilterExpression;
  or(...args: BooleanFilterExpression[]): OrFilterExpression;
  startsWith(
    arg1: string,
    arg2: StringFilterExpression
  ): BooleanFilterExpression;
}

export interface FilterFunction {
  (f: FilterFunctionArgument): BooleanFilterExpression;
}

function buildFilterExpression(
  expression:
    | BooleanFilterExpression
    | NumericFilterExpression
    | StringFilterExpression
): string {
  switch (typeof expression) {
    case "boolean":
    case "number": {
      return expression.toString();
    }
    case "string": {
      return `'${expression}'`;
    }
    case "object": {
      switch (expression.operator) {
        case "eq":
        case "ne":
        case "gt":
        case "ge":
        case "lt":
        case "le": {
          const arg1 = expression.arg1;
          const arg2 = buildFilterExpression(expression.arg2);
          return `(${arg1} ${expression.operator} ${arg2})`;
        }
        case "and":
        case "or": {
          const newExpression = expression.args
            .map(buildFilterExpression)
            .join(` ${expression.operator} `);
          return `(${newExpression})`;
        }
        case "startswith": {
          const arg1 = expression.arg1;
          const arg2 = buildFilterExpression(expression.arg2);
          return `${expression.operator}(${arg1}, ${arg2})`;
        }
      }
    }
  }
}

export function compileFilter(fn: FilterFunction): string {
  const expression = fn({
    equals: (arg1, arg2) => ({ operator: "eq", arg1, arg2 }),
    notEquals: (arg1, arg2) => ({ operator: "ne", arg1, arg2 }),
    lessThan: (arg1, arg2) => ({ operator: "lt", arg1, arg2 }),
    lessThanOrEqual: (arg1, arg2) => ({ operator: "le", arg1, arg2 }),
    greaterThan: (arg1, arg2) => ({ operator: "gt", arg1, arg2 }),
    greaterThanOrEqual: (arg1, arg2) => ({ operator: "ge", arg1, arg2 }),
    and: (...args) => ({ operator: "and", args }),
    or: (...args) => ({ operator: "or", args }),
    startsWith: (arg1, arg2) => ({ operator: "startswith", arg1, arg2 })
  });
  return buildFilterExpression(expression);
}
