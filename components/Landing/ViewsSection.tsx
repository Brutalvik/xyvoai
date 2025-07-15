"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import KanbanView from "./ViewSection/KanbanView";
import TableView from "./ViewSection/TableView";
import CalendarView from "./ViewSection/CalendarView";
import TimelineView from "./ViewSection/TimelineView";

export default function ViewsSection() {
  const [tab, setTab] = useState("kanban");
  const t = useTranslations("ViewsSection");

  const tabs = useMemo(
    () => [
      { id: "kanban", label: t("kanbanTab", { default: "Kanban" }) },
      { id: "table", label: t("tableTab", { default: "Table" }) },
      { id: "calendar", label: t("calendarTab", { default: "Calendar" }) },
      { id: "timeline", label: t("timelineTab", { default: "Timeline" }) },
    ],
    [t]
  );

  return (
    <section
      role="region"
      aria-labelledby="views-heading"
      className="py-20 bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          id="views-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-2"
        >
          {t("multipleViews", { default: "Multiple Views, One Platform" })}
        </h2>
        <p className="text-center text-gray-500 mb-10">
          {t("switchViews", {
            default:
              "Switch between Kanban, Table, Calendar, and Timeline views seamlessly",
          })}
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center">
          {/* Tab buttons */}
          <div
            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6"
            role="tablist"
            aria-label={t("tabListAria", { default: "View Tabs" })}
          >
            {tabs.map((tabItem) => (
              <button
                key={tabItem.id}
                role="tab"
                aria-selected={tab === tabItem.id}
                aria-controls={`tabpanel-${tabItem.id}`}
                id={`tab-${tabItem.id}`}
                tabIndex={tab === tabItem.id ? 0 : -1}
                className={`px-4 py-2 rounded-lg font-semibold focus:outline-none transition-colors duration-150 ${
                  tab === tabItem.id
                    ? "bg-[#7c3aed] text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                style={
                  tab === tabItem.id
                    ? { boxShadow: "0 2px 12px #7c3aed22" }
                    : {}
                }
                onClick={() => setTab(tabItem.id)}
              >
                {tabItem.label}
              </button>
            ))}
          </div>

          {/* Tab panels with AnimatePresence */}
          <div className="w-full min-h-[260px]" style={{ minHeight: 260 }}>
            <AnimatePresence mode="wait" initial={false}>
              {tab === "kanban" && (
                <motion.div
                  key="kanban"
                  role="tabpanel"
                  id="tabpanel-kanban"
                  aria-labelledby="tab-kanban"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.35 }}
                >
                  <KanbanView />
                </motion.div>
              )}
              {tab === "table" && (
                <motion.div
                  key="table"
                  role="tabpanel"
                  id="tabpanel-table"
                  aria-labelledby="tab-table"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.35 }}
                >
                  <TableView />
                </motion.div>
              )}
              {tab === "calendar" && (
                <motion.div
                  key="calendar"
                  role="tabpanel"
                  id="tabpanel-calendar"
                  aria-labelledby="tab-calendar"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.35 }}
                >
                  <CalendarView />
                </motion.div>
              )}
              {tab === "timeline" && (
                <motion.div
                  key="timeline"
                  role="tabpanel"
                  id="tabpanel-timeline"
                  aria-labelledby="tab-timeline"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.35 }}
                >
                  <TimelineView />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
