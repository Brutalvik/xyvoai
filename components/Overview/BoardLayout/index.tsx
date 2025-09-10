"use client";

import { ReactNode, useState } from "react";
import ProjectHeader from "@/components/Overview/ProjectHeader";
import { KanbanBoard } from "@/components/Overview/Kanban";
import { TableView } from "@/components/Overview/TableView";
import {
  initialColumns,
  sampleUsers,
  sampleTags,
} from "@/components/Overview/Dummy/data";
import { Column, Task } from "@/components/Overview/Kanban/types";

interface BoardLayoutProps {
  children?: ReactNode;
}

export function BoardLayout({ children }: BoardLayoutProps) {
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban");
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  // Update a task
  const handleTaskEdit = (taskId: string, updates: Partial<Task>) => {
    setColumns((prevCols) =>
      prevCols.map((col) => ({
        ...col,
        tasks: col.tasks.map((t) =>
          t.id === taskId ? { ...t, ...updates } : t
        ),
      }))
    );
  };

  // Move task between columns
  const handleTaskMove = (
    taskId: string,
    fromColumnId: string,
    toColumnId: string
  ) => {
    setColumns((prevCols) => {
      const newCols = prevCols.map((col) => ({
        ...col,
        tasks: [...col.tasks],
      }));
      let taskToMove: Task | null = null;

      // Remove from old column
      for (const col of newCols) {
        const idx = col.tasks.findIndex((t) => t.id === taskId);
        if (idx > -1) {
          taskToMove = col.tasks.splice(idx, 1)[0];
          break;
        }
      }

      // Add to target column
      if (taskToMove) {
        const targetCol = newCols.find((c) => c.id === toColumnId);
        if (targetCol) targetCol.tasks.push(taskToMove);
      }

      return newCols;
    });
  };

  // Reorder tasks within a column
  const handleTaskReorder = (
    columnId: string,
    taskId: string,
    direction: "up" | "down"
  ) => {
    setColumns((prevCols) =>
      prevCols.map((col) => {
        if (col.id !== columnId) return col;
        const idx = col.tasks.findIndex((t) => t.id === taskId);
        if (idx === -1) return col;
        const newIndex = direction === "up" ? idx - 1 : idx + 1;
        if (newIndex < 0 || newIndex >= col.tasks.length) return col;
        const newTasks = [...col.tasks];
        [newTasks[idx], newTasks[newIndex]] = [
          newTasks[newIndex],
          newTasks[idx],
        ];
        return { ...col, tasks: newTasks };
      })
    );
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Fixed Header */}
      <div className="sticky top-[56px] z-20 bg-white border-b border-gray-200 dark:border-neutral-700 dark:bg-neutral-900">
        <ProjectHeader viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-neutral-700" />

      {/* Board Content */}
      {viewMode === "kanban" ? (
        <KanbanBoard
          columns={columns}
          onTaskMove={handleTaskMove}
          onTaskEdit={handleTaskEdit}
          onTaskDelete={(taskId) => handleTaskEdit(taskId, { deleted: true })}
          onColumnAdd={() => console.log("Add column")}
          onColumnEdit={(colId, updates) =>
            console.log("Edit column", colId, updates)
          }
          onColumnDelete={(colId) => console.log("Delete column", colId)}
        />
      ) : (
        <TableView
          columns={columns}
          availableUsers={sampleUsers}
          availableTags={sampleTags}
        />
      )}
    </div>
  );
}
