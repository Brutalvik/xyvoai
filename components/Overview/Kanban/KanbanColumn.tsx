"use client";

import React from "react";
import { PlusIcon, Ellipsis } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { Column } from "@/components/Overview/Kanban/types";

interface KanbanColumnProps {
  column: Column;
  onTaskCreate?: (columnId: string) => void;
  onTaskEdit?: (taskId: string) => void;
  onTaskDelete?: (taskId: string) => void;
  onTaskMove?: (
    taskId: string,
    fromColumnId: string,
    toColumnId: string
  ) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  onTaskCreate,
  onTaskEdit,
  onTaskDelete,
  onTaskMove,
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const sourceColumnId = e.dataTransfer.getData("sourceColumnId");

    if (taskId && sourceColumnId && sourceColumnId !== column.id) {
      onTaskMove?.(taskId, sourceColumnId, column.id);
    }
  };

  return (
    <div className="flex-shrink-0 w-80 border-r border-gray-200 last:border-r-0">
      {/* Column Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${column.dotColor}`} />
          <h2 className="text-sm font-medium text-gray-700">{column.title}</h2>
          <span className="text-sm text-gray-500">{column.count}</span>
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-1 hover:bg-gray-200 rounded transition-colors">
            <PlusIcon className="h-4 w-4 text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded transition-colors">
            <Ellipsis className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Column Content */}
      <div
        className="p-3 min-h-[600px] bg-white"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            columnId={column.id}
            onTaskEdit={onTaskEdit}
            onTaskDelete={onTaskDelete}
          />
        ))}
      </div>
    </div>
  );
};
