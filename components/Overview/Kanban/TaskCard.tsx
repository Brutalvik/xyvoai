// components/kanban/TaskCard.tsx
"use client";

import React from "react";
import {
  MessageCircle,
  Paperclip,
  Calendar,
  MoreHorizontal,
  BookOpen,
  Wrench,
  Bug,
  Sparkles,
  Rocket,
  Search,
  Palette,
  Settings,
} from "lucide-react";
import {
  Task,
  WorkItemType,
  WorkItemTypeConfig,
} from "@/components/Overview/Kanban/types";
import { EditableField } from "./EditableField";

interface TaskCardProps {
  task: Task;
  columnId: string;
  workItemTypes?: WorkItemTypeConfig[];
  onTaskEdit?: (taskId: string, updates: Partial<Task>) => void;
  onTaskDelete?: (taskId: string) => void;
  onTaskClick?: (task: Task) => void;
}

const getWorkItemTypeIcon = (type: WorkItemType | string) => {
  switch (type) {
    case "user-story":
      return <BookOpen className="h-4 w-4" />;
    case "task":
      return <Wrench className="h-4 w-4" />;
    case "bug":
      return <Bug className="h-4 w-4" />;
    case "feature":
      return <Sparkles className="h-4 w-4" />;
    case "epic":
      return <Rocket className="h-4 w-4" />;
    case "research":
      return <Search className="h-4 w-4" />;
    case "design":
      return <Palette className="h-4 w-4" />;
    case "infrastructure-change":
      return <Settings className="h-4 w-4" />;
    default:
      return <Wrench className="h-4 w-4" />;
  }
};

const getWorkItemTypeColor = (type: WorkItemType | string) => {
  switch (type) {
    case "user-story":
      return "text-blue-600";
    case "task":
      return "text-gray-600";
    case "bug":
      return "text-red-600";
    case "feature":
      return "text-purple-600";
    case "epic":
      return "text-orange-600";
    case "research":
      return "text-green-600";
    case "design":
      return "text-pink-600";
    case "infrastructure-change":
      return "text-indigo-600";
    default:
      return "text-gray-600";
  }
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  columnId,
  workItemTypes,
  onTaskEdit,
  onTaskDelete,
  onTaskClick,
}) => {
  const iconColor = getWorkItemTypeColor(task.workItemType);

  const handleTitleSave = (newTitle: string) => {
    onTaskEdit?.(task.id, { title: newTitle });
  };

  const handleDescriptionSave = (newDescription: string) => {
    onTaskEdit?.(task.id, { description: newDescription });
  };

  return (
    <div
      className="bg-white rounded border border-gray-200 p-3 mb-3 hover:shadow-sm transition-shadow cursor-pointer group"
      draggable
      onClick={() => onTaskClick?.(task)}
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", task.id);
        e.dataTransfer.setData("sourceColumnId", columnId);
      }}
    >
      {/* Task ID, Work Item Type Icon and Tags */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center flex-wrap gap-1">
          <div className="flex items-center space-x-1 mr-2">
            <div className={iconColor}>
              {getWorkItemTypeIcon(task.workItemType)}
            </div>
            <span className="text-xs font-medium text-blue-600">{task.id}</span>
          </div>
          {task.tags.map((tag) => (
            <span
              key={tag.id}
              className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${tag.color}`}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Task Title - Editable */}
      <div className="mb-2" onClick={(e) => e.stopPropagation()}>
        <EditableField
          value={task.title}
          onSave={handleTitleSave}
          className="text-sm font-normal text-gray-900 leading-tight"
          placeholder="Enter task title..."
          required
        />
      </div>

      {/* Task Description - Editable */}
      {(task.description || onTaskEdit) && (
        <div className="mb-3" onClick={(e) => e.stopPropagation()}>
          <EditableField
            value={task.description || ""}
            onSave={handleDescriptionSave}
            className="text-xs text-gray-600 leading-relaxed"
            placeholder="Add description..."
            multiline
          />
        </div>
      )}

      {/* Story Points & Effort (for User Stories and Features) */}
      {(task.storyPoints || task.effort || task.businessValue) && (
        <div className="flex items-center space-x-3 mb-2 text-xs text-gray-500">
          {task.storyPoints && <span>Story Points: {task.storyPoints}</span>}
          {task.effort && <span>Effort: {task.effort}</span>}
          {task.businessValue && (
            <span>Business Value: {task.businessValue}</span>
          )}
        </div>
      )}

      {/* Task Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Assignee */}
          {task.assignee && (
            <div className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full ${task.assignee.color} flex items-center justify-center`}
              >
                <span className="text-xs font-medium text-white">
                  {task.assignee.avatar}
                </span>
              </div>
            </div>
          )}

          {/* Comments */}
          {task.comments !== undefined && task.comments > 0 && (
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-xs text-gray-500">{task.comments}</span>
            </div>
          )}

          {/* Attachments */}
          {task.attachments !== undefined && task.attachments > 0 && (
            <div className="flex items-center space-x-1">
              <Paperclip className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-xs text-gray-500">{task.attachments}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Work Items Progress */}
          {task.workItems !== undefined && (
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500">{task.workItems}%</span>
            </div>
          )}

          {/* Completed Date */}
          {task.completedDate && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-xs text-gray-500">
                {task.completedDate}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
