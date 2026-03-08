"use client";

import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { SpreadsheetDocument } from "@/types/document";
import Link from "next/link";

const documents: SpreadsheetDocument[] = [
  {
    id: "1",
    title: "Budget Sheet",
    author: "Alex",
    updatedAt: Date.now(),
    cells: {},
  },
  {
    id: "2",
    title: "Team Planning",
    author: "Sam",
    updatedAt: Date.now(),
    cells: {},
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={createNewDocument}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Spreadsheet
        </button>
      </div>
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
              <td className="p-3">
                <Link href={`/doc/${doc.id}`} className="text-blue-600">
                  {doc.title}
                </Link>
              </td>
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
