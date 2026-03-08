"use client";

import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
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
  const router = useRouter();

  const createNewDocument = async () => {
    try {
      const docRef = await addDoc(collection(db, "documents"), {
        title: "Untitled Spreadsheet",
        author: "Anonymous",
        updatedAt: Date.now(),
      });

      router.push(`/doc/${docRef.id}`);
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Documents</h1>

      {/* Button */}
      <button
        onClick={createNewDocument}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        New Spreadsheet
      </button>

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
