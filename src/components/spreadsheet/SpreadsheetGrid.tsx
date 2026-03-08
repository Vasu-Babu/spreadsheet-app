"use client";

import React from "react";

export default function SpreadsheetGrid() {
  const rows = 20;
  const cols = 10;

  return (
    <div className="grid grid-cols-10 gap-1 p-4">
      {Array.from({ length: rows * cols }).map((_, i) => (
        <input
          key={i}
          className="border p-1 text-sm focus:outline-blue-500"
        />
      ))}
    </div>
  );
}