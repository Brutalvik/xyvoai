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
      data-card
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        // Modern, minimal, professional card styling
        "relative bg-white rounded-2xl border border-gray-100 shadow-md px-6 py-5 cursor-move transition-all duration-200",
        "hover:shadow-xl hover:border-blue-200 active:scale-[0.98]",
        statusBorderMap[status]
          ? statusBorderMap[status].replace("border-", "border-l-4 border-")
          : "border-l-4 border-gray-200",
      )}
      initial={{ opacity: 0, y: 10 }}
      style={{ minHeight: 140 }}
      transition={{ duration: 0.25 }}
    >
      {/* Card Header */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-gray-900 leading-snug line-clamp-2">
          {title}
        </h3>
        <span className={getStatusBadge(status)}>{t(`status.${status}`)}</span>
      </div>

      {/* Priority Indicator */}
      <div
        className="flex items-center gap-2 text-xs font-medium text-gray-700 mb-2"
        title={priorityTooltipMap[priority]}
      >
        <span
          className={clsx(
            "w-2.5 h-2.5 rounded-full border border-white shadow-sm",
            priorityDotColor[priority] ?? "bg-gray-300",
          )}
        />
        <span className="font-semibold text-gray-500">
          {priorityLabelMap[priority]}
        </span>
      </div>

      {/* Assignee & Effort */}
      <div className="flex items-center gap-3 mt-2 mb-3">
        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-bold border-2 border-white shadow-sm",
            getAvatarColor(assignee),
          )}
          title={assignee}
        >
          {getInitials(assignee)}
        </div>
        <span
          className="text-sm text-gray-700 truncate font-medium"
          title={assignee}
        >
          {assignee}
        </span>
        <div className="flex items-center gap-1 ml-auto text-xs text-gray-500">
          <BookOpenText className="text-gray-300" size={15} />
          <span>
            {t("effort")}: {effort}
          </span>
        </div>
      </div>

      {/* Issue Link */}
      <div className="flex items-center gap-1 text-xs mb-2">
        <LinkIcon className="text-blue-300" size={15} />
        <a
          className="text-blue-600 hover:underline truncate max-w-[120px] font-mono"
          href={issueUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          #{issueUrl.split("/").pop()}
        </a>
      </div>

      {/* Progress Bar */}
      <div className="mt-2">
        <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
          <span>{t("progress")}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={clsx(
              "h-2 rounded-full transition-all duration-300 ease-in-out",
              statusBorderMap[status]?.replace("border", "bg") ?? "bg-gray-400",
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
