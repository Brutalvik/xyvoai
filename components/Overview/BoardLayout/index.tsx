"use client";

import BacklogWorkItem from "@/components/Backlog";
import ProjectHeader from "@/components/Overview/ProjectHeader";
import { ReactNode } from "react";
import KanbanBoard from "@/components/Overview/Kanban";

export function BoardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-full">
      {/* Fixed Header */}
      <div className="sticky top-[56px] z-20 bg-white border-b border-gray-200 dark:border-neutral-700 dark:bg-neutral-900">
        {/* Adjust top-[56px] if your top nav bar height is different */}
        <ProjectHeader />
      </div>
      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-neutral-700" />
      <KanbanBoard />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
