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
    path: "#",
    tooltip: "Kanban boards",
  },
  {
    title: "Reports",
    icon: BarChart,
    path: "#",
    tooltip: "Performance insights",
  },
  {
    title: "Teams",
    icon: Users,
    path: "#",
    tooltip: "Manage team members",
  },
  {
    title: "Integrations",
    icon: Puzzle,
    path: "#",
    tooltip: "Connect third-party tools",
  },
  {
    title: "Launchpad",
    icon: Rocket,
    path: "#",
    tooltip: "Upcoming features",
    badge: "New",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "#",
    tooltip: "Account & workspace settings",
  },
];
