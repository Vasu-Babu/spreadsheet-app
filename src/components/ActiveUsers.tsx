"use client";

interface ActiveUsersProps {
  users: string[];
}

export default function ActiveUsers({ users }: ActiveUsersProps) {
  return (
    <div className="flex gap-3 items-center text-sm">
      <span className="text-gray-500">Active Users:</span>

      {users.map((user) => (
        <div key={user} className="flex items-center gap-1">
          <span className="text-green-500">●</span>
          {user}
        </div>
      ))}
    </div>
  );
}
