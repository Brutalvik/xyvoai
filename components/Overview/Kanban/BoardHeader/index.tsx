// components/kanban/BoardHeader.tsx
"use client";

import { Menu, Search, Eye, Filter, Trash2, UserCircle } from "lucide-react";

export function BoardHeader({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 w-full flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-neutral-700">
      {/* Left: Hamburger + Breadcrumb */}
      <div className="flex items-center gap-4">
        <button
          className="sm:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700"
          onClick={onToggleSidebar}
        >
          <Menu size={20} />
        </button>
        <div className="text-sm font-medium">Project / Sprint / Board</div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700">
          <Search size={18} />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700">
          <Eye size={18} />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700">
          <Filter size={18} />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700">
          <Trash2 size={18} />
        </button>
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700">
          <UserCircle size={18} />
        </button>
      </div>
    </header>
  );
}
