"use client";

interface SpreadsheetCellProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SpreadsheetCell({
  value,
  onChange,
}: SpreadsheetCellProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-full px-2 outline-none border-none text-sm"
    />
  );
}