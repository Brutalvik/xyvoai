"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Avatar } from "@heroui/react";

export default function KanbanView() {
  const t = useTranslations("ViewsSection");

  const columns = [
    {
      title: "To Do",
      color: "bg-default",
      dot: "bg-gray-500",
      tasks: [
        {
          title: "User Authentication",
          points: 5,
          color: "bg-purple-100 text-purple-700",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        },
        {
          title: "API Integration",
          points: 3,
          color: "bg-blue-100 text-blue-700",
          avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
        },
      ],
    },
    {
      title: "In Progress",
      color: "bg-yellow-100/90",
      dot: "bg-yellow-500",
      tasks: [
        {
          title: "Dashboard UI",
          points: 8,
          color: "bg-green-100 text-green-700",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        },
      ],
    },
    {
      title: "Review",
      color: "bg-blue-100/90",
      dot: "bg-blue-500",
      tasks: [
        {
          title: "Mobile Responsive",
          points: 5,
          color: "bg-orange-100 text-orange-700",
          avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
        },
      ],
    },
    {
      title: "Done",
      color: "bg-green-100/90",
      dot: "bg-green-500",
      tasks: [
        {
          title: "Project Setup",
          points: 2,
          color: "bg-gray-100 text-gray-700",
          avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        },
      ],
    },
  ];

  return (
    <motion.div
      key="kanban"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-wrap sm:flex-nowrap gap-4 sm:gap-6 overflow-x-auto -mx-4 px-2 sm:mx-0 sm:px-0 scrollbar-hide"
      role="tabpanel"
      aria-labelledby="tab-kanban"
      tabIndex={0}
    >
      {columns.map((col, idx) => (
        <div
          key={idx}
          className={`${col.color} rounded-xl p-4 flex-1 min-w-[220px] flex-shrink-0`}
          aria-label={col.title}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className={`w-3 h-3 rounded-full inline-block ${col.dot}`} />
            <span className="font-semibold text-gray-700">
              {col.title} ({col.tasks.length})
            </span>
          </div>

          {col.tasks.map((task) => (
            <div
              key={task.title}
              className="bg-default-400 text-default-500 rounded-xl p-3 mb-3 shadow-sm flex flex-col gap-2"
              aria-label={task.title}
            >
              <div className="font-medium text-gray-900">{task.title}</div>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-0.5 rounded ${task.color}`}>
                  {task.points} points
                </span>
                <Avatar
                  size="sm"
                  src={task.avatar}
                  alt={task.title}
                  isBordered
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  );
}
