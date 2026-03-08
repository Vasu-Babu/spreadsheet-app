"use client"

import Link from "next/link"

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Collaborative Spreadsheet App</h1>

      <p className="text-lg mb-4">
        Welcome! Create or open spreadsheets and collaborate in real time.
      </p>

      <Link
        href="/dashboard"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Go to Dashboard
      </Link>
    </div>
  )
}
