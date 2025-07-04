import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface User {
  id: string;
  sub: string;
  email: string;
  name: string;
  phone: string;
  image: string;
  organizationId: string | null;
  organizationName: string | null;
  timezone: string;
  role: string;
  accountType: string;
  socialIdp: string | null;
  createdAt: string | null;
  lastLogin: string | null;
  status: string;
  permissions: string[];
  attributes: Record<string, string>;
}

export interface TeamMember {
  id: string; // UUID for user or member reference
  name?: string;
  email?: string;
  role?: "owner" | "admin" | "member" | "viewer"; // extensible
  avatarUrl?: string;
  joinedAt?: string; // ISO timestamp
  isActive?: boolean; // for soft deletes / deactivation
  permissions?: string[]; // e.g. ["edit_tasks", "view_analytics"]
}

export type ProjectType = "Internal" | "Client" | "AI-Generated";

export type ProjectPriority = "Low" | "Medium" | "High" | "Urgent";

export type ProjectStatus =
  | "Not Started"
  | "In Progress"
  | "Blocked"
  | "Completed"
  | "Cancelled";

export type Visibility = "Public" | "Private";

export interface Project {
  id: string;
  name: string;
  description?: string;
  tags: string[];
  color: string;
  status: "active" | "completed" | "archived";
  visibility: "private" | "public";
  ai_tasks: boolean;
  start_date?: string;
  end_date?: string;
  created_by?: string;
  organization_id?: string;
  created_at?: string;
  updated_at?: string;

  // Optional UI metadata
  completion?: number;
  priority?: "Low" | "Medium" | "High" | "Urgent";
  projectType?: string;
  team?: TeamMember[];
  nextAction?: string;
}

export type ProjectsListProps = {
  showAIOnly: boolean;
  statusFilter: string;
  visibilityFilter: string;
  projects?: Project[];
};
