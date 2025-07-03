"use client";

import React from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { BookOpenText, LinkIcon } from "lucide-react";
import { motion } from "framer-motion";

export type CardProps = {
  title: string;
  assignee: string;
  effort: number;
  issueUrl: string;
  progress: number;
  status: "inProgress" | "blocked" | "done" | "review";
  priority: "low" | "medium" | "high" | "critical";
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string) {
  const colors = [
    "bg-red-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

function getStatusBadge(status: CardProps["status"]) {
  const base = "text-xs font-medium px-2 py-0.5 rounded-full";
  switch (status) {
    case "inProgress":
      return clsx(base, "bg-blue-100 text-blue-700");
    case "blocked":
      return clsx(base, "bg-red-100 text-red-700");
    case "done":
      return clsx(base, "bg-green-100 text-green-700");
    case "review":
      return clsx(base, "bg-yellow-100 text-yellow-700");
    default:
      return clsx(base, "bg-gray-100 text-gray-700");
  }
}

const statusBorderMap = {
  inProgress: "border-blue-500",
  blocked: "border-red-500",
  done: "border-green-500",
  review: "border-yellow-500",
};

const priorityDotColor = {
  low: "bg-green-400",
  medium: "bg-yellow-400",
  high: "bg-orange-500",
  critical: "bg-red-500",
};

const priorityLabelMap = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

const priorityTooltipMap = {
  low: "Low – Can be addressed later",
  medium: "Medium – Needs attention soon",
  high: "High – Important to resolve",
  critical: "Critical – Must be resolved immediately",
};

export default function Card({
  title,
  assignee,
  effort,
  issueUrl,
  progress,
  status,
  priority,
}: CardProps) {
  const t = useTranslations("Board");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={clsx(
        "relative rounded-xl border-l-4 p-4 shadow-sm transition-all cursor-move bg-white hover:shadow-md hover:ring-1",
        statusBorderMap[status] ?? "border-gray-300"
      )}
      data-card
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-base text-gray-900 leading-snug line-clamp-2">
          {title}
        </h3>
        <span className={getStatusBadge(status)}>{t(`status.${status}`)}</span>
      </div>

      <div
        className="flex items-center gap-1 text-xs font-medium text-gray-700 mt-1"
        title={priorityTooltipMap[priority]}
      >
        <span
          className={clsx(
            "w-2.5 h-2.5 rounded-full",
            priorityDotColor[priority] ?? "bg-gray-300"
          )}
        />
        {priorityLabelMap[priority]}
      </div>

      <div className="flex items-center gap-2 mt-3">
        <div
          className={clsx(
            "w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold",
            getAvatarColor(assignee)
          )}
          title={assignee}
        >
          {getInitials(assignee)}
        </div>
        <span className="text-sm text-gray-700 truncate" title={assignee}>
          {assignee}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-600 mt-3">
        <div className="flex items-center gap-1">
          <BookOpenText size={14} className="text-gray-400" />
          <span>
            {t("effort")}: {effort}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <LinkIcon size={14} className="text-blue-400" />
          <a
            href={issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline truncate max-w-[120px]"
          >
            #{issueUrl.split("/").pop()}
          </a>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
          <span>{t("progress")}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={clsx(
              "h-2 rounded-full transition-all duration-300 ease-in-out",
              statusBorderMap[status]?.replace("border", "bg") ?? "bg-gray-400"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
