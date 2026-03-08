export interface SpreadsheetDocument {
  id: string;
  title: string;
  author: string;
  updatedAt: number;
  cells: Record<string, string>
}
