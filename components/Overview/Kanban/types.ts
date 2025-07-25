export interface User {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
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
  onTaskMove?: (
    taskId: string,
    fromColumnId: string,
    toColumnId: string
  ) => void;
  onTaskCreate?: (columnId: string) => void;
  onTaskEdit?: (taskId: string) => void;
  onTaskDelete?: (taskId: string) => void;
  onColumnAdd?: () => void;
  onColumnEdit?: (columnId: string) => void;
  onColumnDelete?: (columnId: string) => void;
}
