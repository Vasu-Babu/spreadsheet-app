"use client";

import { useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { useParams } from "next/navigation";
import { parseFormula } from "@/lib/formulaParser";

import SpreadsheetCell from "@/components/spreadsheet/SpreadsheetCell";
import { useState } from "react";

export default function SpreadsheetEditorPage() {
  const rows = 50;
  const params = useParams();
  const documentId = params.id as string;
  const columns = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i),
  );

  const [cells, setCells] = useState<Record<string, string>>({});

  const updateCell = async (cellId: string, value: string) => {
    setCells((prev) => ({
      ...prev,
      [cellId]: value,
    }));

    try {
      const docRef = doc(db, "documents", documentId);

      await updateDoc(docRef, {
        [`cells.${cellId}`]: value,
        updatedAt: Date.now(),
      });
    } catch (error) {
      console.error("Error updating cell:", error);
    }
  };

  useEffect(() => {
    const docRef = doc(db, "documents", documentId);

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data();

      if (data?.cells) {
        setCells(data.cells);
      }
    });

    return () => unsubscribe();
  }, [documentId]);

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
              {columns.map((col) => {
                const cellId = `${col}${rowIndex + 1}`;
                const cellValue = cells[cellId] || "";
                const displayValue = parseFormula(cellValue, cells);

                return (
                  <div key={cellId} className="border-t border-l h-10">
                    <SpreadsheetCell
                      value={displayValue}
                      onChange={(value: string) => updateCell(cellId, value)}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
