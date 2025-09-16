"use client";

import React, { ReactNode, useState } from "react";
import ProjectHeader from "@/components/Overview/ProjectHeader";
import { KanbanBoard } from "@/components/Overview/Kanban";
import { TableView } from "@/components/Overview/TableView";
import {
  initialColumns,
  sampleUsers,
  sampleTags,
} from "@/components/Overview/Dummy/data";
import { Column, Task } from "@/components/Overview/Kanban/types";
import GanttView from "@/components/Overview/GanttView";
import { ViewMode } from "react-modern-gantt";
import CreateTask from "@/components/CreateTask";
import { selectUser } from "@/store/selectors";
import { useAppSelector } from "@/store/hooks";

interface BoardLayoutProps {
  children?: ReactNode;
}

export function BoardLayout({ children }: BoardLayoutProps) {
  // safe selector: if selectUser returns null, activeUser will be null
  const activeUser: any = useAppSelector(selectUser);
  const user = activeUser?.user; // undefined if not logged in

  const [view, setView] = useState<
    "kanban" | "table" | "gantt" | "showCreateTask"
  >("kanban");
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="sticky top-[56px] z-20 bg-white border-b border-gray-200 dark:bg-neutral-900 dark:border-neutral-700">
        <ProjectHeader viewMode={view} setViewMode={setView} />
      </div>
      <div className="border-t border-gray-200 dark:border-neutral-700" />

      {children}

      {view === "kanban" && (
        <KanbanBoard
          columns={columns}
          onTaskMove={(tid, from, to) => {
            setColumns((prev) => {
              const cols = prev.map((c) => ({ ...c, tasks: [...c.tasks] }));
              let moving: Task | undefined;
              cols.forEach((c) => {
                const idx = c.tasks.findIndex((t) => t.id === tid);
                if (idx >= 0) {
                  moving = c.tasks.splice(idx, 1)[0];
                }
              });
              if (moving) {
                const target = cols.find((c) => c.id === to);
                if (target) target.tasks.push(moving);
              }
              return cols;
            });
          }}
          onTaskEdit={(tid, updates) =>
            setColumns((prev) =>
              prev.map((col) => ({
                ...col,
                tasks: col.tasks.map((t) =>
                  t.id === tid ? { ...t, ...updates } : t
                ),
              }))
            )
          }
          onTaskDelete={(tid) =>
            setColumns((prev) =>
              prev.map((col) => ({
                ...col,
                tasks: col.tasks.filter((t) => t.id !== tid),
              }))
            )
          }
          onColumnAdd={() => {}}
          onColumnEdit={() => {}}
          onColumnDelete={() => {}}
        />
      )}

      {view === "table" && (
        <TableView
          columns={columns}
          availableUsers={sampleUsers}
          availableTags={sampleTags}
        />
      )}

      {view === "gantt" && (
        <div className="h-full w-full overflow-auto">
          <GanttView
            columns={columns}
            onTaskUpdate={(updatedTask) => {
              setColumns((prev) =>
                prev.map((col) => ({
                  ...col,
                  tasks: col.tasks.map((t) =>
                    t.id === updatedTask.id
                      ? {
                          ...t,
                          startDate: updatedTask.startDate,
                          endDate: updatedTask.endDate,
                          workItems: updatedTask.workItems,
                        }
                      : t
                  ),
                }))
              );
            }}
            viewMode={ViewMode.DAY}
          />
        </div>
      )}

      {view === "showCreateTask" && user && <CreateTask currentUser={user} />}
    </div>
  );
}

export default BoardLayout;
