"use client";

import { useState } from "react";

interface SpreadsheetCellProps {
  initialValue?: string;
}

export default function SpreadsheetCell({
  initialValue = "",
}: SpreadsheetCellProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full h-full px-2 outline-none border-none text-sm"
    />
  );
}
