"use client";

export default function SpreadsheetEditorPage() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="h-14 border-b flex items-center px-6 bg-white">
        <h1 className="text-lg font-semibold">Spreadsheet Editor</h1>
      </header>

      {/* Scrollable Grid Container */}
      <div className="flex-1 overflow-auto bg-gray-50 p-4">
        <div className="min-w-800 min-h-600 bg-white border rounded shadow-sm">
          {/* Placeholder Grid */}
          <div className="grid grid-cols-10 gap-px bg-gray-200">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="bg-white h-12 flex items-center justify-center text-sm"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
