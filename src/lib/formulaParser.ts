export function parseFormula(
  formula: string,
  cells: Record<string, string>,
): string {
  if (!formula.startsWith("=")) {
    return formula;
  }

  try {
    let expression = formula.slice(1);

    // Replace cell references like A1, B2
    expression = expression.replace(/[A-Z][0-9]+/g, (match) => {
      const value = cells[match];
      return value ? value : "0";
    });

    const result = eval(expression);

    return result.toString();
  } catch (error) {
    return "ERROR";
  }
}
