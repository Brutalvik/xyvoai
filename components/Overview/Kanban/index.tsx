"use client";

import React, { useState } from "react";
import {
  FunnelIcon,
  ArrowUpDownIcon,
  EyeIcon,
  CogIcon,
  ShareIcon,
  Search,
  PlusIcon,
} from "lucide-react";
import {
  KanbanBoardProps,
  Column,
  User,
  Tag,
} from "@/components/Overview/Kanban/types";
import { KanbanColumn } from "./KanbanColumn";

// Sample data matching the Azure DevOps style exactly
const sampleUsers: User[] = [
  { id: "1", name: "John Doe", avatar: "JD", color: "bg-blue-500" },
  { id: "2", name: "Jane Smith", avatar: "JS", color: "bg-green-500" },
  { id: "3", name: "Mike Johnson", avatar: "MJ", color: "bg-red-500" },
  { id: "4", name: "Sarah Wilson", avatar: "SW", color: "bg-purple-500" },
  { id: "5", name: "Alex Brown", avatar: "AB", color: "bg-orange-500" },
  { id: "6", name: "Chris Davis", avatar: "CD", color: "bg-teal-500" },
  { id: "7", name: "Emma Taylor", avatar: "ET", color: "bg-pink-500" },
];

const sampleTags: Tag[] = [
  {
    id: "1",
    name: "Feature",
    color: "bg-blue-100 text-blue-700 border border-blue-200",
  },
  {
    id: "2",
    name: "Bug",
    color: "bg-red-100 text-red-700 border border-red-200",
  },
  {
    id: "3",
    name: "Frontend",
    color: "bg-purple-100 text-purple-700 border border-purple-200",
  },
  {
    id: "4",
    name: "Backend",
    color: "bg-green-100 text-green-700 border border-green-200",
  },
  {
    id: "5",
    name: "UX",
    color: "bg-orange-100 text-orange-700 border border-orange-200",
  },
];

const initialColumns: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    count: 5,
    color: "bg-white",
    dotColor: "bg-gray-400",
    tasks: [
      {
        id: "TASK-423",
        title: "Implement node toggle",
        description:
          "Add system preference detection and manual toggle for dark mode across the app.",
        assignee: sampleUsers[0],
        comments: 3,
        attachments: 0,
        workItems: 24,
        tags: [sampleTags[0], sampleTags[2]],
      },
      {
        id: "TASK-425",
        title: "Redesign dashboard widgets",
        description:
          "Create new designs for dashboard widgets with better data visualization.",
        assignee: sampleUsers[1],
        comments: 7,
        attachments: 4,
        tags: [sampleTags[4]],
      },
      {
        id: "TASK-428",
        title: "Fix date picker in Safari",
        description:
          "Date picker component doesn't work correctly in Safari browsers.",
        assignee: sampleUsers[2],
        comments: 0,
        attachments: 0,
        tags: [sampleTags[1]],
      },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    count: 2,
    color: "bg-white",
    dotColor: "bg-blue-500",
    tasks: [
      {
        id: "TASK-418",
        title: "Implement OAuth2 authentication",
        description:
          "Add support for Google, GitHub, and Microsoft OAuth providers.",
        assignee: sampleUsers[3],
        comments: 5,
        attachments: 8,
        workItems: 70,
        tags: [sampleTags[0], sampleTags[3]],
      },
      {
        id: "TASK-421",
        title: "Build notification center",
        description:
          "Create a unified notification center with real-time updates.",
        assignee: sampleUsers[4],
        comments: 3,
        attachments: 8,
        workItems: 45,
        tags: [sampleTags[0], sampleTags[2]],
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    count: 2,
    color: "bg-white",
    dotColor: "bg-purple-500",
    tasks: [
      {
        id: "TASK-415",
        title: "Implement data export functionality",
        description:
          "Add CSV, Excel, and PDF export options for all data tables.",
        assignee: sampleUsers[5],
        comments: 4,
        attachments: 0,
        workItems: 22,
        tags: [sampleTags[0], sampleTags[2]],
      },
      {
        id: "TASK-418",
        title: "Fix memory leak in data processing",
        description: "Resolve memory leak when processing large datasets.",
        assignee: sampleUsers[6],
        comments: 12,
        attachments: 0,
        workItems: 11,
        tags: [sampleTags[1], sampleTags[3]],
      },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    count: 4,
    color: "bg-white",
    dotColor: "bg-green-500",
    tasks: [
      {
        id: "TASK-412",
        title: "Implement multi-language support",
        description: "Add i18n framework and language switcher.",
        assignee: sampleUsers[0],
        comments: 0,
        attachments: 0,
        tags: [sampleTags[0]],
        completedDate: "Jul 12",
      },
      {
        id: "TASK-410",
        title: "Add keyboard shortcuts",
        description: "Implement keyboard shortcuts for common actions.",
        assignee: sampleUsers[1],
        comments: 0,
        attachments: 0,
        tags: [sampleTags[0]],
        completedDate: "Jul 10",
      },
    ],
  },
];

export const KanbanBoard: React.FC<Partial<KanbanBoardProps>> = ({
  columns: propColumns,
  onTaskMove,
  onTaskCreate,
  onTaskEdit,
  onTaskDelete,
  onColumnAdd,
  onColumnEdit,
  onColumnDelete,
}) => {
  const [columns, setColumns] = useState<Column[]>(
    propColumns || initialColumns
  );
  const [searchTerm, setSearchTerm] = useState("");

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
          (task: { id: string }) => task.id === taskId
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
    <div className="flex flex-col h-full bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
            <FunnelIcon className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
            <ArrowUpDownIcon className="h-4 w-4" />
            <span>Sort</span>
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
            <EyeIcon className="h-4 w-4" />
            <span>View</span>
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
            <CogIcon className="h-4 w-4" />
            <span>Customize</span>
          </button>
          <button className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
            <ShareIcon className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Kanban Board */}
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
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
