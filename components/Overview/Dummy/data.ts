// components/Overview/Kanban/dummyData.ts
import { Column, User, Tag } from "@/components/Overview/Kanban/types";

export const sampleUsers: User[] = [
  { id: "1", name: "John Doe", avatar: "JD", color: "bg-blue-500" },
  { id: "2", name: "Jane Smith", avatar: "JS", color: "bg-green-500" },
  { id: "3", name: "Mike Johnson", avatar: "MJ", color: "bg-red-500" },
  { id: "4", name: "Sarah Wilson", avatar: "SW", color: "bg-purple-500" },
  { id: "5", name: "Alex Brown", avatar: "AB", color: "bg-orange-500" },
  { id: "6", name: "Chris Davis", avatar: "CD", color: "bg-teal-500" },
  { id: "7", name: "Emma Taylor", avatar: "ET", color: "bg-pink-500" },
];

export const sampleTags: Tag[] = [
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

export const initialColumns: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    count: 3,
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
        workItemType: "",
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
        workItemType: "",
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
        workItemType: "",
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
        workItemType: "",
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
        workItemType: "",
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
        workItemType: "",
      },
      {
        id: "TASK-418",
        title: "Fix memory leak in data processing",
        description: "Resolve memory leak when processing large datasets.",
        assignee: sampleUsers[6],
        comments: 12,
        attachments: 0,
        tags: [sampleTags[1], sampleTags[3]],
        workItemType: "",
      },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    count: 3,
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
        workItemType: "",
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
        workItemType: "",
      },
      {
        id: "TASK-407",
        title: "Optimize database queries",
        description: "Optimize database queries for better performance.",
        assignee: sampleUsers[2],
        comments: 0,
        attachments: 0,
        tags: [sampleTags[0]],
        completedDate: "Jul 8",
        workItemType: "",
      },
    ],
  },
];
