"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useTranslations } from "next-intl";
import CurrentSprintCard from "@/components/Overview/CurrentSprintCard";
import { SparkleIcon, UsersIcon } from "lucide-react";

// Dummy data
const teams = [
  {
    id: "team1",
    name: "Product Alpha",
    description: "Cross-functional core team for Alpha product.",
    lead: "Emily Stone",
    color: "#3b82f6",
  },
];

const currentSprint = {
  id: "sprint1",
  name: "Q3 Launch Sprint",
  startDate: new Date().toISOString(),
  endDate: new Date(
    new Date().getTime() + 5 * 24 * 60 * 60 * 1000
  ).toISOString(),
  status: "active",
  velocity: 75,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

export default function TeamSprintDashboard() {
  const t = useTranslations("Overview");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        {t("title")}
      </h1>

      {/* Current Sprint */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentSprint ? (
          <CurrentSprintCard sprint={currentSprint} />
        ) : (
          <Card className="border border-dashed">
            <CardBody className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">
                {t("noSprint")}
              </p>
              <Link href="/overview/sprints/create">
                <Button className="mt-4" variant="solid">
                  {t("createSprint")}
                </Button>
              </Link>
            </CardBody>
          </Card>
        )}

        {/* Teams Overview */}
        {teams.length > 0 ? (
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold">{t("teams")}</h2>
              </div>
              <Link href="/overview/teams">
                <Button size="sm" variant="ghost">
                  {t("viewAll")}
                </Button>
              </Link>
            </CardHeader>
            <CardBody className="space-y-2">
              {teams.map((team) => (
                <Link
                  key={team.id}
                  href={`/overview/teams/${team.id}`}
                  className="block p-3 rounded-lg border hover:shadow bg-gray-50 dark:bg-gray-900"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: team.color }}
                    />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {team.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {team.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </CardBody>
          </Card>
        ) : (
          <Card className="border border-dashed">
            <CardBody className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">{t("noTeams")}</p>
              <Link href="/overview/teams/create">
                <Button className="mt-4" variant="solid">
                  {t("createTeam")}
                </Button>
              </Link>
            </CardBody>
          </Card>
        )}
      </div>

      {/* AI Suggestions (Placeholder) */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardHeader className="flex items-center gap-2">
          <SparkleIcon className="w-5 h-5" />
          <h2 className="text-lg font-semibold">{t("aiSuggestions")}</h2>
        </CardHeader>
        <CardBody>
          <p>{t("aiPlaceholder")}</p>
        </CardBody>
      </Card>
    </div>
  );
}
