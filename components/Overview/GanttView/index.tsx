"use client";

import React, { useMemo, useState } from "react";
import GanttChart, { ViewMode } from "react-modern-gantt";
import "react-modern-gantt/dist/index.css";

import { Column, Task } from "@/components/Overview/Kanban/types";

type Props = {
  columns: Column[];
  onTaskUpdate?: (updatedTask: Task) => void;
  viewMode?: ViewMode;
};

export default function GanttView({
  columns,
  onTaskUpdate,
  viewMode = ViewMode.Day,
}: Props) {
  // Convert Kanban columns → task groups
  const taskGroups = useMemo(() => {
    return columns.map((col) => ({
      id: col.id,
      name: col.title,
      description: col.title,
      tasks: col.tasks.map((t) => ({
        id: t.id,
        name: t.title,
        startDate: t.startDate ? new Date(t.startDate) : new Date(),
        endDate: t.endDate ? new Date(t.endDate) : new Date(),
        color: t.assignee?.color || "#3b82f6",
        percent: t.workItems ? Math.min(100, t.workItems) : 0,
        dependencies: t.dependencies ?? [],
        assignee: t.assignee?.name,
      })),
    }));
  }, [columns]);

  const [groups, setGroups] = useState(taskGroups);

  const handleTaskUpdate = (groupId: string, updatedTask: any) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              tasks: g.tasks.map((t) =>
                t.id === updatedTask.id ? updatedTask : t
              ),
            }
          : g
      )
    );

    // Call parent callback to sync Kanban state
    if (onTaskUpdate) {
      const col = columns.find((c) => c.id === groupId);
      if (col) {
        const task = col.tasks.find((t) => t.id === updatedTask.id);
        if (task) {
          onTaskUpdate({
            ...task,
            startDate: updatedTask.startDate.toISOString().slice(0, 10),
            endDate: updatedTask.endDate.toISOString().slice(0, 10),
            workItems: updatedTask.percent,
          });
        }
      }
    }
  };

  return (
    <div className="h-full w-full p-4">
      <GanttChart
        tasks={groups}
        viewMode={viewMode}
        darkMode={false}
        showProgress={true}
        onTaskUpdate={handleTaskUpdate}
      />
    </div>
  );
}
