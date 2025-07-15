"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { startOfWeek, addDays, format, isSameDay, startOfDay } from "date-fns";

type CalendarTask = {
  date: string;
  title: string;
  points: number;
  tag: string;
};

export default function CalendarView() {
  const t = useTranslations("ViewsSection");

  const today = startOfDay(new Date());
  const startDate = startOfWeek(today, { weekStartsOn: 0 }); // Sunday
  const totalDays = 14;
  const daysArray = Array.from({ length: totalDays }, (_, i) =>
    addDays(startDate, i)
  );

  const dummyTasks: CalendarTask[] = [
    {
      date: format(addDays(today, 1), "yyyy-MM-dd"),
      title: "Setup Repo",
      points: 2,
      tag: "Backend",
    },
    {
      date: format(addDays(today, 3), "yyyy-MM-dd"),
      title: "Auth UI",
      points: 5,
      tag: "Frontend",
    },
    {
      date: format(addDays(today, 5), "yyyy-MM-dd"),
      title: "API Integration",
      points: 3,
      tag: "Integration",
    },
    {
      date: format(addDays(today, 6), "yyyy-MM-dd"),
      title: "Write Tests",
      points: 4,
      tag: "QA",
    },
    {
      date: format(addDays(today, 9), "yyyy-MM-dd"),
      title: "UX Polish",
      points: 2,
      tag: "Design",
    },
  ];

  return (
    <motion.div
      key="calendar"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col items-center"
      role="tabpanel"
      aria-labelledby="tab-calendar"
      tabIndex={0}
    >
      <div className="w-full max-w-6xl px-4">
        {/* Weekday Header */}
        <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {daysArray.map((day, i) => {
            const dateStr = format(day, "yyyy-MM-dd");
            const display = format(day, "d");
            const taskItems = dummyTasks.filter((t) =>
              isSameDay(new Date(t.date), day)
            );

            return (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-md p-2 min-h-[100px] flex flex-col"
                aria-label={`Tasks for ${format(day, "PPP")}`}
              >
                <div className="text-xs font-semibold text-gray-600 mb-1">
                  {display}
                </div>
                <div className="flex-1 space-y-1">
                  {taskItems.length > 0 ? (
                    taskItems.map((task, index) => (
                      <div
                        key={index}
                        className="text-[11px] text-gray-700 bg-gray-100 rounded px-2 py-1"
                      >
                        {task.title}
                      </div>
                    ))
                  ) : (
                    <div className="text-[10px] text-gray-300 italic">
                      {t("noTasks", { default: "No tasks" })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-600 text-center">
        <span className="inline-block w-3 h-3 rounded-full bg-[#7c3aed] mr-2 align-middle"></span>
        {t("calendarDemo", { default: "2-week responsive calendar view" })}
      </div>
    </motion.div>
  );
}
