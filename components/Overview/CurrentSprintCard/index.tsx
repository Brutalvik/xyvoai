"use client";

import React, { useEffect, useState } from "react";
import { format, differenceInSeconds } from "date-fns";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";

interface CurrentSprintCardProps {
  sprint: {
    id: string;
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    velocity: number;
    timezone: string;
  };
}

export default function CurrentSprintCard({ sprint }: CurrentSprintCardProps) {
  const t = useTranslations("Sprint");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [percentageLeft, setPercentageLeft] = useState(100);

  const { startDate, endDate, name, status, id, velocity, timezone } = sprint;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(endDate);
      const start = new Date(startDate);
      const totalDuration = differenceInSeconds(end, start);
      const remainingDuration = Math.max(differenceInSeconds(end, now), 0);
      const percent = (remainingDuration / totalDuration) * 100;

      const days = Math.floor(remainingDuration / (3600 * 24));
      const hours = Math.floor((remainingDuration % (3600 * 24)) / 3600);
      const minutes = Math.floor((remainingDuration % 3600) / 60);
      const seconds = remainingDuration % 60;

      setCountdown({
        days,
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });

      setPercentageLeft(percent);
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  const statusColor =
    {
      Active: "text-green-500",
      Completed: "text-default-500",
      Upcoming: "text-blue-500",
    }[status] || "text-gray-400";

  return (
    <div className="rounded-xl shadow p-4 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 w-full max-w-xl">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-lg font-semibold text-default-900">{name}</h2>
        <span className={`text-sm font-medium ${statusColor}`}>{status}</span>
      </div>

      <p className="text-sm text-default-500">
        {t("startDate")}: {format(new Date(startDate), "PPpp")}
      </p>
      <p className="text-sm text-default-500">
        {t("endDate")}: {format(new Date(endDate), "PPpp")}
      </p>
      <p className="text-sm text-default-500 mb-2">
        {t("timezone")}:{" "}
        {timezone || Intl.DateTimeFormat().resolvedOptions().timeZone}
      </p>
      <div className="flex justify-end mb-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-default-500">{t("endsIn")}</p>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className="text-xl font-bold text-default-700">
                {countdown.days}
              </div>
              <div className="text-xs uppercase text-default-500">
                {t("days")}
              </div>
            </div>
            <div>
              <div className="text-xl font-mono font-semibold text-green-600">
                {countdown.hours}
              </div>
              <div className="text-xs uppercase text-default-500">
                {t("hours")}
              </div>
            </div>
            <div>
              <div className="text-xl font-mono font-semibold text-green-600">
                {countdown.minutes}
              </div>
              <div className="text-xs uppercase text-default-500">
                {t("minutes")}
              </div>
            </div>
            <div>
              <div className="text-xl font-mono font-semibold text-green-600">
                {countdown.seconds}
              </div>
              <div className="text-xs uppercase text-default-500">
                {t("seconds")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
        <motion.div
          animate={{ width: `${percentageLeft}%` }}
          className="h-full bg-green-500"
          initial={{ width: 0 }}
          transition={{ ease: "linear", duration: 1 }}
        />
      </div>

      <div className="flex justify-between items-center text-sm font-medium mb-2">
        <span className="text-default-500">
          {t("velocity")}: {velocity}
        </span>
        <Button size="sm" variant="bordered">
          <a href={`/overview/sprints/${id}`}>{t("view")}</a>
        </Button>
      </div>
    </div>
  );
}
