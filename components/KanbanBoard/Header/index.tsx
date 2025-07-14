"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Tooltip } from "@heroui/react";

import { NavigationBreadcrumbs } from "@/components/KanbanBoard/NavigationBreadcrumbs";

type BoardView = "kanban" | "list" | "gantt";

interface HeaderProps {
  view: BoardView;
  onViewChange: (view: BoardView) => void;
}

const Header: React.FC<HeaderProps> = ({ view, onViewChange }) => {
  const t = useTranslations("Header");
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => setSearchOpen((prev) => !prev);

  return (
    <header className="px-6 py-4 shadow-sm flex items-center justify-between border-b">
      <div className="flex flex-col">
        <NavigationBreadcrumbs />
      </div>

      <div className="flex items-center space-x-4">
        <div
          className={`transition-all duration-300 ease-in-out border rounded flex items-center bg-gray-100 overflow-hidden ${
            searchOpen ? "w-64" : "w-8"
          }`}
        >
          <input
            autoFocus={searchOpen}
            className={`bg-transparent outline-none px-2 w-full ${
              searchOpen ? "block" : "hidden"
            }`}
            placeholder={t("searchPlaceholder")}
            type="text"
          />
          <span
            className="material-icons cursor-pointer px-2"
            onClick={toggleSearch}
          >
            search
          </span>
        </div>

        <span
          className="material-icons cursor-pointer"
          onClick={() => alert("Filters clicked")}
        >
          filter_list
        </span>
        {/* View Switcher */}
        <div className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 shadow-sm">
          {[
            {
              key: "kanban",
              icon: "view_kanban",
              tooltip: t("kanbanViewTooltip", { default: "Kanban View" }),
            },
            {
              key: "list",
              icon: "view_list",
              tooltip: t("listViewTooltip", { default: "List View" }),
            },
            {
              key: "gantt",
              icon: "timeline",
              tooltip: t("ganttViewTooltip", { default: "Gantt Chart View" }),
            },
          ].map(({ key, icon, tooltip }) => (
            <Tooltip key={key} content={tooltip} placement="bottom">
              <button
                aria-label={tooltip}
                aria-pressed={view === key}
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 focus:outline-none ${
                  view === key
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                type="button"
                onClick={() => onViewChange(key as BoardView)}
              >
                <span className="material-icons text-2xl">{icon}</span>
              </button>
            </Tooltip>
          ))}
        </div>
        <span
          className="material-icons cursor-pointer"
          onClick={() => alert("Delete clicked")}
        >
          delete
        </span>
      </div>
    </header>
  );
};

export default Header;
