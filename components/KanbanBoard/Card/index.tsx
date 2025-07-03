"use client";

import React from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { BookOpenText, LinkIcon, UserIcon } from "lucide-react";

export type CardProps = {
  title: string;
  assignee: string;
  storyPoints: number;
  issueUrl: string;
  progress: number;
  color: "blue" | "green" | "yellow" | "indigo";
};

export default function Card({
  title,
  assignee,
  storyPoints,
  issueUrl,
  progress,
  color,
}: CardProps) {
  const t = useTranslations("Board");

  const colorMap = {
    blue: {
      border: "border-blue-500",
      bg: "bg-blue-50",
      progress: "bg-blue-500",
      text: "text-blue-700",
    },
    green: {
      border: "border-green-500",
      bg: "bg-green-50",
      progress: "bg-green-500",
      text: "text-green-700",
    },
    yellow: {
      border: "border-yellow-500",
      bg: "bg-yellow-50",
      progress: "bg-yellow-400",
      text: "text-yellow-700",
    },
    indigo: {
      border: "border-indigo-500",
      bg: "bg-indigo-50",
      progress: "bg-indigo-500",
      text: "text-indigo-700",
    },
  };

  return (
    <div
      className={clsx(
        "relative rounded-lg shadow-md transition hover:shadow-lg cursor-move border-l-4 p-4 space-y-2",
        colorMap[color].bg,
        colorMap[color].border
      )}
      data-card
    >
      <h3 className="font-semibold text-base text-gray-900">{title}</h3>

      <div className="flex items-center text-sm text-gray-600 gap-2">
        <UserIcon size={16} className="text-gray-400" />
        <span>{assignee}</span>
      </div>

      <div className="flex items-center justify-between text-xs mt-1">
        <div className="flex items-center gap-1 text-gray-500">
          <BookOpenText size={14} className="text-gray-400" />
          <span>
            {t("storyPoints")}: {storyPoints}
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

      <div className="mt-2">
        <div className="flex justify-between items-center mb-1 text-xs text-gray-500">
          <span>{t("progress")}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={clsx(
              "h-2 rounded-full transition-all",
              colorMap[color].progress
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
