export function parseFormula(
  formula: string,
  cells: Record<string, string>,
): string {
  if (!formula.startsWith("=")) {
    return formula;
  }

  try {
    let expression = formula.slice(1);

    // Handle SUM(A1:A5)
    expression = expression.replace(
      /SUM\(([A-Z][0-9]+):([A-Z][0-9]+)\)/g,
      (_, start, end) => {
        const col = start.match(/[A-Z]+/)?.[0];
        const startRow = parseInt(start.match(/[0-9]+/)?.[0] || "0");
        const endRow = parseInt(end.match(/[0-9]+/)?.[0] || "0");

        let sum = 0;

        for (let i = startRow; i <= endRow; i++) {
          const cellId = `${col}${i}`;
          const value = parseFloat(cells[cellId] || "0");
          sum += value;
        }

        return sum.toString();
      },
    );

    // Replace single cell references like A1
    expression = expression.replace(/[A-Z][0-9]+/g, (match) => {
      return cells[match] || "0";
    });

    const result = eval(expression);

    return result.toString();
  } catch {
    return "ERROR";
  }
}
