// components/Overview/Kanban/types.ts

export interface User {
  id: string;
  name: string;
  avatar: string; // initials or URL
  color: string; // Tailwind color classes
}

export interface Tag {
  id: string;
  name: string;
  color: string; // Tailwind color classes
}

export type WorkItemType =
  | "user-story"
  | "task"
  | "bug"
  | "feature"
  | "epic"
  | "research"
  | "design"
  | "infrastructure-change"
  | "custom";

export interface WorkItemTypeConfig {
  id: WorkItemType | string;
  name: string;
  icon: string;
  color: string;
  backgroundColor: string;
  description?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;

  assignee?: User;
  comments?: number;
  attachments?: number;
  workItems?: number;

  tags: Tag[];
  completedDate?: string;
  priority?: "low" | "medium" | "high" | "critical";
  dueDate?: string;
  workItemType: WorkItemType | string;
  storyPoints?: number;
  effort?: number;
  businessValue?: number;
  parentId?: string;
  childrenIds?: string[];
  deleted?: boolean;

  /** Gantt fields */
  startDate: string; // ISO string
  endDate: string; // ISO string

  /** 🆕 Dependencies for Gantt libraries */
  dependencies?: string[]; // array of other Task IDs this task depends on
  progress?: number; // 0–100 (percentage complete)
}

export interface Column {
  id: string;
  title: string;
  count: number;
  color: string;
  dotColor: string;
  tasks: Task[];
}

export interface KanbanBoardProps {
  columns: Column[];
  workItemTypes?: WorkItemTypeConfig[];
  availableUsers?: User[];
  availableTags?: Tag[];

  onTaskMove?: (
    taskId: string,
    fromColumnId: string,
    toColumnId: string
  ) => void;
  onTaskCreate?: (
    columnId: string,
    workItemType?: WorkItemType | string
  ) => void;
  onTaskEdit?: (taskId: string, updates: Partial<Task>) => void;
  onTaskDelete?: (taskId: string) => void;

  onColumnAdd?: () => void;
  onColumnEdit?: (columnId: string, updates: Partial<Column>) => void;
  onColumnDelete?: (columnId: string) => void;

  onWorkItemTypeCreate?: (workItemType: Omit<WorkItemTypeConfig, "id">) => void;
}
