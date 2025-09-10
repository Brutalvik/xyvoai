"use client";

import React, { useState } from "react";
import { KanbanBoardProps, Column } from "./types";
import { KanbanColumn } from "./KanbanColumn";

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns: propColumns,
  onTaskMove,
  onTaskCreate,
  onTaskEdit,
  onTaskDelete,
  onColumnAdd,
  onColumnEdit,
  onColumnDelete,
}) => {
  const [columns, setColumns] = useState<Column[]>(propColumns || []);

  const handleTaskMove = (
    taskId: string,
    fromColumnId: string,
    toColumnId: string
  ) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      const fromColumn = newColumns.find((col) => col.id === fromColumnId);
      const toColumn = newColumns.find((col) => col.id === toColumnId);

      if (fromColumn && toColumn) {
        const taskIndex = fromColumn.tasks.findIndex(
          (task) => task.id === taskId
        );
        if (taskIndex !== -1) {
          const [task] = fromColumn.tasks.splice(taskIndex, 1);
          toColumn.tasks.push(task);
          fromColumn.count = fromColumn.tasks.length;
          toColumn.count = toColumn.tasks.length;
        }
      }

      return newColumns;
    });

    onTaskMove?.(taskId, fromColumnId, toColumnId);
  };

  return (
    <div className="flex-1 overflow-x-auto bg-gray-50">
      <div className="flex h-full min-w-max">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onTaskCreate={onTaskCreate}
            onTaskEdit={onTaskEdit}
            onTaskDelete={onTaskDelete}
            onTaskMove={handleTaskMove}
          />
        ))}
        {/* Add Column Button */}
        <div className="flex-shrink-0 w-12 bg-gray-50 border-l border-gray-200 flex items-start justify-center pt-4">
          <button
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
            onClick={onColumnAdd}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
