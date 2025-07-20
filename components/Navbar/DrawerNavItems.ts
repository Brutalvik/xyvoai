import {
  LayoutDashboard,
  FolderKanban,
  BarChart,
  Users,
  Puzzle,
  Rocket,
  Settings,
} from "lucide-react";

export const drawerNavItems = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    path: "/overview",
    tooltip: "Project summary",
  },
  {
    title: "Boards",
    icon: FolderKanban,
    path: "/boards",
    tooltip: "Kanban boards",
  },
  {
    title: "Reports",
    icon: BarChart,
    path: "/reports",
    tooltip: "Performance insights",
  },
  {
    title: "Teams",
    icon: Users,
    path: "/teams",
    tooltip: "Manage team members",
  },
  {
    title: "Integrations",
    icon: Puzzle,
    path: "/integrations",
    tooltip: "Connect third-party tools",
  },
  {
    title: "Launchpad",
    icon: Rocket,
    path: "/launchpad",
    tooltip: "Upcoming features",
    badge: "New",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
    tooltip: "Account & workspace settings",
  },
];
