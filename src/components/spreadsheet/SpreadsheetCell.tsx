"use client";

interface SpreadsheetCellProps {
  value: string;
  row: number;
  col: number;
  onChange: (value: string) => void;
}

export default function SpreadsheetCell({
  value,
  row,
  col,
  onChange,
}: SpreadsheetCellProps) {
  const moveFocus = (r: number, c: number) => {
    const next = document.querySelector(
      `[data-row="${r}"][data-col="${c}"]`
    ) as HTMLInputElement;

    if (next) next.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowRight":
        moveFocus(row, col + 1);
        break;

      case "ArrowLeft":
        moveFocus(row, col - 1);
        break;

      case "ArrowDown":
        moveFocus(row + 1, col);
        break;

      case "ArrowUp":
        moveFocus(row - 1, col);
        break;

      case "Tab":
        e.preventDefault();
        moveFocus(row, col + 1);
        break;

      case "Enter":
        e.preventDefault();
        moveFocus(row + 1, col);
        break;
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      data-row={row}
      data-col={col}
      className="w-full h-full px-2 outline-none border-none text-sm"
    />
  );
}