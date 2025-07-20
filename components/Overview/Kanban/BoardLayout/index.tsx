// components/kanban/BoardLayout.tsx
"use client";

import { ReactNode } from "react";

export function BoardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
