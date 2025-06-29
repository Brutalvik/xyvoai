import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface User {
  id: string;
  sub: string;
  email: string;
  name: string;
  phone?: string;
  countryCode?: string;
  token: string;
  refreshToken?: string;
  role?: string;
  organizationId?: string | null;
  image?: string;
  accountType?: "personal" | "organization";
  attributes?: Record<string, string>;
}

export type TeamMember = {
  name: string;
  src: string;
};

export type ProjectType = "Internal" | "Client" | "AI-Generated";

export type ProjectPriority = "Low" | "Medium" | "High" | "Urgent";

export type ProjectStatus =
  | "Not Started"
  | "In Progress"
  | "Blocked"
  | "Completed"
  | "Cancelled";

export type Visibility = "Public" | "Private";

export type Project = {
  id: string;
  name: string;
  color: string;
  tags: string[];
  startDate: string;
  dueDate: string;
  visibility: Visibility;
  aiTasks: boolean;
  projectType: ProjectType;
  priority: ProjectPriority;
  status: ProjectStatus;
  completion: number;
  team: TeamMember[];
  nextAction: string;
};

export type ProjectsListProps = {
  showAIOnly: boolean;
  statusFilter: string;
  visibilityFilter: string;
  projects?: Project[];
};
