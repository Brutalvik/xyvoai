"use client";

import React from "react";
import { Paperclip, MessageSquareText, Calendar } from "lucide-react";
import { Task } from "@/components/Overview/Kanban/types";

interface TaskCardProps {
  task: Task;
  columnId: string;
  onTaskEdit?: (taskId: string) => void;
  onTaskDelete?: (taskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  columnId,
  onTaskEdit,
  onTaskDelete,
}) => {
  return (
    <div
      className="bg-white rounded border border-gray-200 p-3 mb-3 hover:shadow-sm transition-shadow cursor-pointer group"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", task.id);
        e.dataTransfer.setData("sourceColumnId", columnId);
      }}
    >
      {/* Task ID and Tags */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center flex-wrap gap-1">
          <span className="text-xs font-medium text-blue-600 mr-2">
            {task.id}
          </span>
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

      {/* Task Title */}
      <h3 className="text-sm font-normal text-gray-900 mb-2 leading-tight">
        {task.title}
      </h3>

      {/* Task Description */}
      {task.description && (
        <p className="text-xs text-gray-600 mb-3 leading-relaxed">
          {task.description}
        </p>
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
              <MessageSquareText className="h-3.5 w-3.5 text-gray-400" />
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
