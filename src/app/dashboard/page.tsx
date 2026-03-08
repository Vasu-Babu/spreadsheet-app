import { SpreadsheetDocument } from "@/types/document";

const documents: SpreadsheetDocument[] = [
  {
    id: "1",
    title: "Budget Sheet",
    author: "Alex",
    updatedAt: Date.now(),
  },
  {
    id: "2",
    title: "Team Planning",
    author: "Sam",
    updatedAt: Date.now(),
  },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Documents</h1>

      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Author</th>
            <th className="text-left p-3">Last Modified</th>
          </tr>
        </thead>

        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="border-t">
              <td className="p-3">{doc.title}</td>
              <td className="p-3">{doc.author}</td>
              <td className="p-3">
                {new Date(doc.updatedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
