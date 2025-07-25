"use client";

import React, { useState } from "react";
import { X, User, Calendar, Hash, Star, Zap } from "lucide-react";
import {
  Task,
  User as UserType,
  Tag,
  WorkItemTypeConfig,
} from "@/components/Overview/Kanban/types";

interface TaskEditModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskId: string, updates: Partial<Task>) => void;
  onDelete?: (taskId: string) => void;
  availableUsers?: UserType[];
  availableTags?: Tag[];
  workItemTypes?: WorkItemTypeConfig[];
}

export const TaskEditModal: React.FC<TaskEditModalProps> = ({
  task,
  isOpen,
  onClose,
  onSave,
  onDelete,
  availableUsers = [],
  availableTags = [],
  workItemTypes = [],
}) => {
  const [editedTask, setEditedTask] = useState<Partial<Task>>(task || {});

  if (!isOpen || !task) return null;

  const handleSave = () => {
    onSave(task.id, editedTask);
    onClose();
  };

  const handleDelete = () => {
    if (
      onDelete &&
      window.confirm("Are you sure you want to delete this task?")
    ) {
      onDelete(task.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Edit Task</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Task ID and Work Item Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task ID
              </label>
              <input
                type="text"
                value={editedTask.id || task.id}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, id: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Item Type
              </label>
              <select
                value={editedTask.workItemType || task.workItemType}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, workItemType: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {workItemTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={editedTask.title || task.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter task title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={editedTask.description || task.description || ""}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter task description..."
            />
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignee
            </label>
            <select
              value={editedTask.assignee?.id || task.assignee?.id || ""}
              onChange={(e) => {
                const selectedUser = availableUsers.find(
                  (u) => u.id === e.target.value
                );
                setEditedTask({ ...editedTask, assignee: selectedUser });
              }}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Unassigned</option>
              {availableUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(editedTask.tags || task.tags || []).map((tag: Tag) => (
                <span
                  key={tag.id}
                  className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${tag.color}`}
                >
                  {tag.name}
                  <button
                    onClick={() => {
                      const newTags = (
                        editedTask.tags ||
                        task.tags ||
                        []
                      ).filter((t: Tag) => t.id !== tag.id);
                      setEditedTask({ ...editedTask, tags: newTags });
                    }}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <select
              onChange={(e) => {
                const selectedTag = availableTags.find(
                  (t) => t.id === e.target.value
                );
                if (
                  selectedTag &&
                  !(editedTask.tags || task.tags || []).find(
                    (t: Tag) => t.id === selectedTag.id
                  )
                ) {
                  setEditedTask({
                    ...editedTask,
                    tags: [
                      ...(editedTask.tags || task.tags || []),
                      selectedTag,
                    ],
                  });
                }
                e.target.value = "";
              }}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Add a tag...</option>
              {availableTags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          {/* Additional Fields */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Story Points
              </label>
              <input
                type="number"
                value={editedTask.storyPoints || task.storyPoints || ""}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    storyPoints: parseInt(e.target.value) || undefined,
                  })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Effort
              </label>
              <input
                type="number"
                value={editedTask.effort || task.effort || ""}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    effort: parseInt(e.target.value) || undefined,
                  })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Value
              </label>
              <input
                type="number"
                value={editedTask.businessValue || task.businessValue || ""}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    businessValue: parseInt(e.target.value) || undefined,
                  })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          {/* Progress */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Progress (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={editedTask.workItems || task.workItems || ""}
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  workItems: parseInt(e.target.value) || undefined,
                })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            Delete Task
          </button>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
