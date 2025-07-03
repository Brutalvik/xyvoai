"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { RocketIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Props = {
  onCreateProject: () => void;
  plan: "free" | "pro" | "team";
  currentProjectCount: number;
};

export default function GetStarted({
  onCreateProject,
  plan,
  currentProjectCount,
}: Props) {
  const t = useTranslations("DashboardProjects");

  const hasReachedLimit = plan === "free" && currentProjectCount >= 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto mt-16"
    >
      <Card className="p-6 border-dashed border-2 border-gray-300 dark:border-gray-600 text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <RocketIcon className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-2xl font-semibold">{t("getStartedTitle")}</h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {hasReachedLimit
              ? t("projectLimitReached")
              : t("getStartedDescription")}
          </p>
          <Button
            variant="solid"
            onPress={onCreateProject}
            disabled={hasReachedLimit}
          >
            {hasReachedLimit ? t("upgradePlan") : t("createProject")}
          </Button>
        </CardBody>
      </Card>
    </motion.div>
  );
}
