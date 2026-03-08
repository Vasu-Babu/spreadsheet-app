"use client";
import SpreadsheetCell from "@/components/spreadsheet/SpreadsheetCell";
export default function SpreadsheetEditorPage() {
  const rows = 50;

  const columns = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i),
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="h-14 border-b flex items-center px-6">
        <h1 className="text-lg font-semibold">Spreadsheet</h1>
      </header>

      {/* Scrollable Grid */}
      <div className="flex-1 overflow-auto p-4 bg-gray-50">
        <div className="inline-block border">
          {/* Column Headers */}
          <div className="grid grid-cols-[40px_repeat(26,120px)] bg-gray-100 border-b">
            <div></div>

            {columns.map((col) => (
              <div key={col} className="border-l text-center font-medium py-2">
                {col}
              </div>
            ))}
          </div>

          {/* Rows */}
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-[40px_repeat(26,120px)]"
            >
              {/* Row Number */}
              <div className="border-t text-center bg-gray-100 py-2">
                {rowIndex + 1}
              </div>

              {/* Cells */}
              {columns.map((col) => (
                <div key={col} className="border-t border-l h-10">
                  <SpreadsheetCell />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
