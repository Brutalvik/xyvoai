// components/kanban/BoardLayout.tsx
"use client";

import { SidebarNav } from "@/components/Overview/Kanban/SidebarNav";
import { ReactNode, useState } from "react";
import { BoardHeader } from "@/components/Overview/Kanban/BoardHeader";

export function BoardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SidebarNav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <BoardHeader onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        {children}
      </div>
    </div>
  );
}
