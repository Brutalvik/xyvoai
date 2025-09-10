"use client";

import React, { useState } from "react";
import { EditableField } from "@/components/Overview/TableView/EditableField";
import { Column, Task, User, Tag } from "@/components/Overview/Kanban/types";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { ChevronDown } from "lucide-react";

interface ProjectTableViewProps {
  columns: Column[];
  availableUsers?: User[];
  availableTags?: Tag[];
}

export const TableView: React.FC<ProjectTableViewProps> = ({
  columns: initialColumns,
}) => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        tasks: col.tasks.map((t) =>
          t.id === taskId ? { ...t, ...updates } : t
        ),
      }))
    );
  };

  const moveTask = (taskId: string, toColumnId: string) => {
    setColumns((prevCols) => {
      const newCols = prevCols.map((col) => ({
        ...col,
        tasks: [...col.tasks],
      }));
      let taskToMove: Task | null = null;

      for (let col of newCols) {
        const idx = col.tasks.findIndex((t) => t.id === taskId);
        if (idx > -1) {
          taskToMove = col.tasks.splice(idx, 1)[0];
          break;
        }
      }

      if (taskToMove) {
        const targetCol = newCols.find((c) => c.id === toColumnId);
        if (targetCol) targetCol.tasks.push(taskToMove);
      }

      return newCols;
    });
  };

  // Helper to get color classes for status badges
  const getStatusColor = (columnId: string) => {
    const col = columns.find((c) => c.id === columnId);
    switch (col?.id) {
      case "backlog":
        return "bg-gray-200 text-gray-800";
      case "progress":
        return "bg-blue-100 text-blue-700";
      case "review":
        return "bg-purple-100 text-purple-700";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-2 space-y-4">
      {columns.map((col) => (
        <div key={col.id} className="border rounded-md shadow-sm bg-white">
          <div className="bg-gray-100 p-2 flex items-center justify-between border-b border-gray-300">
            <h2 className="font-medium text-gray-700 truncate">
              {col.title} ({col.tasks.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[600px] md:min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 border-b">ID</th>
                  <th className="p-2 border-b">Title</th>
                  <th className="p-2 border-b hidden md:table-cell">
                    Description
                  </th>
                  <th className="p-2 border-b hidden sm:table-cell">
                    Assignee
                  </th>
                  <th className="p-2 border-b hidden sm:table-cell">Tags</th>
                  <th className="p-2 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {col.tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="p-2 border-b">{task.id}</td>
                    <td className="p-2 border-b">
                      <EditableField
                        value={task.title}
                        onSave={(val) =>
                          handleTaskUpdate(task.id, { title: val })
                        }
                        required
                      />
                    </td>
                    <td className="p-2 border-b hidden md:table-cell">
                      <EditableField
                        value={task.description || ""}
                        onSave={(val) =>
                          handleTaskUpdate(task.id, { description: val })
                        }
                        multiline
                      />
                    </td>
                    <td className="p-2 border-b hidden sm:table-cell">
                      {task.assignee?.name || "Unassigned"}
                    </td>
                    <td className="p-2 border-b hidden sm:table-cell flex flex-wrap gap-1">
                      {task.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className={`px-1 py-0.5 text-xs rounded ${tag.color}`}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </td>
                    <td className="p-2 border-b">
                      <Dropdown placement="bottom-start">
                        <DropdownTrigger>
                          <button
                            className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                              col.id
                            )} w-full sm:w-auto`}
                          >
                            {col.title} <ChevronDown className="w-3 h-3" />
                          </button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          {columns
                            .filter((c) => c.id !== col.id)
                            .map((targetCol) => (
                              <DropdownItem
                                key={targetCol.id}
                                onClick={() => moveTask(task.id, targetCol.id)}
                              >
                                <span
                                  className={`px-1 py-0.5 text-xs rounded ${getStatusColor(
                                    targetCol.id
                                  )}`}
                                >
                                  {targetCol.title}
                                </span>
                              </DropdownItem>
                            ))}
                        </DropdownMenu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};
